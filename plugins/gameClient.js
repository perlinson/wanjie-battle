import WanJieClient from 'lib/client'
import WanJieLobbyClient from 'lib/lobby-client'
export default (ctx, inject) => {
  const client = new WanJieClient()
  inject('game', client)
  ctx.$game = client

  const lobbyClient = new WanJieLobbyClient()

  inject('lobbyApi', lobbyClient)
  ctx.$lobbyApi = lobbyClient
}
