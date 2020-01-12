const net = require('net'), colors = require('colors'), server = new net.createServer(), port = 2020

server.on('connection', (socket) => {

    let remoteInfo = socket.remoteAddress + ":" + socket.remotePort 

    console.log('\n[+]'.green + ' New connection from ' + remoteInfo)

    socket.on('data', (msg) => {

        console.log('\n[+]'.green + " New message of " + msg)
    })

    socket.on('close', () => {

        console.log('\n[O_o]'.red + " Connection closed")
    })

    socket.on('error', (err) => {

        console.log('\n[!]'.red + " Oups error : ", `${err}`.red)
    })

})

server.listen(port, () => {

    console.log('\n[+]'.green + " Server open on port 2020")
})
