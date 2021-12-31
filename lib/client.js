import { Client } from 'boardgame.io/client'
import { SocketIO } from 'boardgame.io/multiplayer'
import { WanJieBattle } from './game'
export default class WanJieClient {
  start (playerID, matchID, credentials) {
    this.client = Client(
      {
        game: WanJieBattle,
        numPlayers: 4,
        // multiplayer: SocketIO({ server: '143.198.227.84:8000' }),
        multiplayer: SocketIO({ server: process.env.NUXT_ENV_SERVER_HOST || 'localhost:5000' }),
        playerID,
        matchID,
        credentials,
        // debug: false
      }
    )
    this.client.start()
  }
}