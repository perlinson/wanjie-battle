import { LobbyClient } from 'boardgame.io/client'
const SERVER_HOST = process.env.NUXT_ENV_SERVER_HOST || 'http://localhost:5000'
const GAME_ID = 'default'
class WanJieLobbyClient {
  constructor() {
    this.lobbyClient = new LobbyClient({ server: SERVER_HOST })
  }

  async createRoom(numPlayers) {
    const { matchID } = await this.lobbyClient.createMatch(GAME_ID, {
      numPlayers,
    })
    return matchID
  }

  async joinRoom({ matchID, playerID, playerName }) {
    console.log('joinRoom', matchID, playerID, playerName)
    const { playerCredentials } = await this.lobbyClient.joinMatch(
      GAME_ID,
      matchID,
      {
        playerID: String(playerID),
        playerName,
      }
    )

    return { playerCredentials }
  }

  async updatePlayer({ matchID, playerID, credentials, newName }) {
    await this.lobbyClient.updatePlayer(GAME_ID, matchID, {
      playerID: String(playerID),
      credentials,
      newName,
    })
  }

  getRoomMetadata(matchID) {
    return this.lobbyClient.getMatch(GAME_ID, matchID)
  }

  async playAgain({ matchID, playerID, credential }) {
    const { nextMatchID } = await this.lobbyClient.playAgain(GAME_ID, matchID, {
      playerID: String(playerID),
      credentials: credential,
    })

    return { nextMatchID }
  }
}

export default WanJieLobbyClient
