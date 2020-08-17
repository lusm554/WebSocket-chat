const ws = new WebSocket('ws://localhost:8080/')

// configure an object and send to the server
function sendMessage() {
    let msg = {
        type:'message',
        text: m.value,
        id,
        username,
        date: Date.now()
    }
    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)

    m.value = ''
}

function loginUser() {
    // login user
}

function logoutUser() {
    // logout user
}

function addMessage(data) {
    console.log('message:', data.text)

    let li = document.createElement('li')   
    li.innerHTML = `<b>${data.username}</b>#${data.id} ${data.text}`;
    list.append(li)

    // check for scroll chat
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
    switch ( data.type ) {
        case 'login':
            console.log('login:', data.status)
            // ws.send(e.data);
            break;
        case 'message': 
            addMessage(data)
            break;
        default:
            break;
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
    sendMessage()
});

signin.addEventListener('click', (e) => {
    window.location.href = 'http://localhost:8080/auth/signin'
})

signup.addEventListener('click', (e) => {
    window.location.href = 'http://localhost:8080/auth/signup'
})