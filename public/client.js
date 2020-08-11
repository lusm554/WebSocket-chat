const ws = new WebSocket('ws://localhost:8080/')

let username;

(function() {
    username = prompt('username?')

    while(username==null || username=='') {
        username = prompt('username?')
    }
})();

// configure an object and send to the sever
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


ws.addEventListener('open', (e) => {
    console.log('connection open')
})

// receive message from server
ws.addEventListener('message', (e) => {
    console.log('message:', e.data)

    let li = document.createElement('li')   
    li.innerText = e.data;
    list.append(li)
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