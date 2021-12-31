const { Server, Origins } = require('boardgame.io/server')
const  WanJieBattle  = require('lib/game').WanJieBattle

const server = Server({
  games: [WanJieBattle],
  origins: [Origins.LOCALHOST],
})

server.run(8000)
