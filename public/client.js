const ws = new WebSocket('ws://localhost:8080/')

window.addEventListener('load', () => {
    if(!localStorage.user) {
        prompt('Do you already have an account?(yes/no)') === 'yes' ?
            window.location.href = 'http://localhost:8080/auth/signin' :
            window.location.href = 'http://localhost:8080/auth/signup'
        return;
    }
    submit.disabled = false
})

function getUser() {  
    const USER = JSON.parse(
        localStorage.getItem('user')
    )
    return USER;
}

function logoutUser() {
    /**
     * Clear all data from local storage
     * and redirect user to signin page
     */
    localStorage.clear()
    window.location.href = 'http://localhost:8080/auth/signin'
}
auth_button.addEventListener('click', logoutUser)

// set the message object 
function setMessageObj(user) {
    const id = user.external_id, username = user.username
    let msg = {
        text: m.value,
        id,
        username,
        date: Date.now()
    }
    return msg
}

// send message obj to the server
function sendMessageToServer(msg) {
    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)

    m.value = ''
}

function addMessageToChat(data) {
    let li = document.createElement('li')   
    li.innerHTML = `<b>${data.username}</b>#${data.id} ${data.text}`;
    list.append(li)

    /**
     * Checking whether to scroll the page, 
     * functions from ./scrolling.js
     */
    if ( !shouldScroll() ) {
        scrollToBottom()
    }
}

ws.addEventListener('open', (e) => {
    console.log('connection open')
})

// receive message from server
ws.addEventListener('message', (e) => {
    let data = JSON.parse(e.data)
    if(data.type === 'message') {
        addMessageToChat(data) 
    }
    else {
        // add previous messages to the chat
        for(rawMessage of data.previousMsgs) {
            let message = JSON.parse(rawMessage)
            addMessageToChat(message)
        }
    }
});

ws.addEventListener('close', (e) => {
    console.log(`Connection closed: ${e.reason} \nwasClean: ${e.wasClean}`)
});

ws.addEventListener('error', (e) => {
    console.log('WebSocket error:', e)
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessageToServer( setMessageObj( getUser() ) )
});