const ws = new WebSocket('ws://localhost:8080/')

let username, id;

function setRandomId() {
    id = Math.floor(Math.random() * Math.floor(100));
}

function setUserName() {
    username = prompt('username?')

    return username === null || username === ''
}

// configure an object and send to the server
// @username 
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

// @username 
function loginUser() {
    // set username variable
    const SET_USER_NAME = setUserName()
    if(SET_USER_NAME) {
        return SET_USER_NAME;
    }
    setRandomId()

    // enable submit button
    submit.disabled = false;

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
    // username = ''
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

log.addEventListener('click', (e) => {
    if(log.value === 'Login') {
        if( loginUser() ) return;
    }
    else if (log.value === 'Logout') {
        logoutUser()
    }

    log.value = log.value === 'Logout' ? 'Login' : 'Logout'
})