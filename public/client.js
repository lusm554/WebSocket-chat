const ws = new WebSocket('ws://localhost:8080/')

let username;

function getUserName() {
    username = prompt('username?')

    while(username==null || username=='') {
        username = prompt('username?')
    }
    loginUser()
}

// configure an object and send to the server
function sendMessage() {
    let msg = {
        type:'message',
        text: m.value,
        id: 1,
        username,
        date: Date.now()
    }
    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)

    m.value = ''
}

function loginUser() {
    let msg = {
        type: 'login',
        id: 1,
        username,
        date: Date.now()
    }

    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)
}

function addMessage(data) {
    console.log('message:', data.text)

    let li = document.createElement('li')   
    li.innerHTML = `<b>${data.username}</b>#${data.id} ${data.text}`;
    list.append(li)
}

ws.addEventListener('open', (e) => {
    console.log('connection open')
    getUserName()
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