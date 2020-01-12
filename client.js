const net = require('net'), colors = require('colors'), readlineSync = require('readline-sync'), cp = require('child_process')

let client = null

function connectSocket() {

    if (client) {

        console.log('\n[!]'.red + ' A Socket is already open\n'.bold)

        setTimeout(() => {

            main()
        }, 0)
        return
    }

    client = new net.Socket()

    client.on('error', (err) => {

        client.destroy()
        client = null

        console.log('\n[!]'.red + ' Error : ', `${err.message}`.red)

        setTimeout(() => {

            main()
        }, 0)
        return
    })

    let host = readlineSync.question('\n[?]'.blue + " Enter Host ~> "), port = parseInt(readlineSync.question('\n[?]'.blue + " Enter Port ~> "))

    client.connect(port, host, () => {

        console.log('\n[+]'.green + " You have been connected")

        setTimeout(() => {

            main()
        }, 0)
    })

}

function sendMessage() {

    if (!client) {

        console.log('\n[!]'.red + ' You must to open a Socket\n')

        setTimeout(() => {
            main()
        }, 0)
    } else if (client) {

        let content = readlineSync.question('\n[?]'.cyan + ' Enter a message ~> ')
        let username = readlineSync.question('\n[?]'.cyan + ' Enter an username ~> ')
        let valueSend = `${username.bold}`.yellow + ` : ${content}`

        client.write(valueSend)

        console.log('\n[+]'.green + ' Message is send')

        setTimeout(() => {

            main()
        }, 0)

    }

}

function closeSocket() {

    if (!client) {

        console.log('\n[!]'.red + ' You must to open a Socket\n')

        setTimeout(() => {
            main()
        }, 0)

    } else if (client) {

        client.destroy()
        client = null

        console.log('\n[+]'.green + ' The socket is now close\n')

        setTimeout(() => {

            main()
        }, 2000)
    }
}

function quit() {

    if (!client) {

        console.log('\n[+]'.green + ' Exit\n')

        setTimeout(() => {

            cp.exec('exit')
        }, 2000)
        

    } else if (client) {

        client.destroy()
        client = null

        console.log('\n[+]'.green + " Socket is destroy\n")

        setTimeout(() => {

            cp.exec('exit')
        }, 2000)
    }
}

function main() {

    let selector = readlineSync.question('\n[?]'.blue + ' You Must To Choose One Option\n\n' + '[1]'.cyan + ' Connect Socket\n' + '[2]'.cyan + ' Send Message\n' + '[3]'.cyan + ' Close Socket\n' + '[4]'.cyan + ' Quit\n' + '\n---> '.rainbow)

    switch (selector) {
        case "1":
            connectSocket()
        break
        case "2":
            sendMessage()
        break
        case "3":
            closeSocket()
        break
        case "4":
            quit()
        break
    }
}

main()
