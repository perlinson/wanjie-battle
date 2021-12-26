import { Client } from 'boardgame.io/client'

import { SocketIO } from 'boardgame.io/multiplayer'
import { WanJieBattle } from './game'
class WanJieBattleClient {
  constructor({ playerID } = {}) {
    this.client = Client({
      game: WanJieBattle,
      numPlayers: 2,
      multiplayer: SocketIO({ server: 'localhost:5000' }),
      playerID
    })
    this.client.start()
  }
}

export default WanJieBattleClient
