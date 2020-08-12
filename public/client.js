const ws = new WebSocket('ws://localhost:8080/')

let username, id;

function setRandomId() {
    id = Math.floor(Math.random() * Math.floor(100));
}

function getUserName() {
    username = prompt('username?')

    while(username==null || username=='') {
        username = prompt('username?')
    }
    setRandomId()
}

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
    // enable submit button
    submit.disabled = false;

    // set username variable 
    getUserName()

    let msg = {
        type: 'login',
        id,
        username,
        date: Date.now()
    }

    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)
}

function logoutUser() {
    username = ''
    // disable submit button
    submit.disabled = true;

    // set new username 
    // getUserName()

    // send data to server
}

function addMessage(data) {
    console.log('message:', data.text)

    let li = document.createElement('li')   
    li.innerHTML = `<b>${data.username}</b>#${data.id} ${data.text}`;
    list.append(li)

    // check for scroll chat
    if (!shouldScroll()) {
        scrollToBottom()
    }
}

ws.addEventListener('open', (e) => {
    console.log('connection open')
    // getUserName()
})

// receive message from server
ws.addEventListener('message', (e) => {
    let data = JSON.parse(e.data)
    switch (data.type) {
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

log.addEventListener('click', (e) => {
    if(log.value === 'Login') {
        loginUser()
    }
    else if (log.value === 'Logout') {
        logoutUser()
    }

    log.value = log.value === 'Logout' ? 'Login' : 'Logout'
})