const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8001 })

wss.on('connection', function connection(ws) {
  const loginReply = JSON.stringify({
    type: 'CONNECTED',
  })

  ws.send(loginReply)
})
