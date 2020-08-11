const ws = new WebSocket('ws://localhost:8080/')

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
    ws.send(m.value)
    m.value = ''
});