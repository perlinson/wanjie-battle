import DominoesClient from '../lib/client'
import DominoesLobbyClient from '../lib/lobby-client'
export default (ctx, inject) => {
  const client = new DominoesClient()
  inject('game', client)
  ctx.$game = client

  const lobbyClient = new DominoesLobbyClient()

  inject('lobbyApi', lobbyClient)
  ctx.$lobbyApi = lobbyClient
}
