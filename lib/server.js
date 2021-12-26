const { Server, Origins } = require('boardgame.io/server')
const { WanJieBattle } = require('./game/app')

const server = Server({
  games: [WanJieBattle],
  origins: [Origins.LOCALHOST],
})

server.run(5000)
