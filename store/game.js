const BASE_URL = process.env.NUXT_ENV_BASE_URL || 'http://localhost:3000'

export const state = () => ({
  playerName: '',
  playerId: '',
  currentPlayerId: '',
  playerCredentials: '',
  matchId: '',
  client: null,
  baseUrl: BASE_URL,
  gamestate: {},
})

export const getters = {
  matchUrl(state) {
    console.log(`${state.baseUrl}/?matchId=${state.matchId}`)
    return `${state.baseUrl}/?matchId=${state.matchId}`
  },
}

export const mutations = {
  setGameState(state, gameState) {
    state.gamestate = gameState
    console.log('SET_GAMESTATE', gameState)
  },
  setPlayerId(state, playerId) {
    state.playerId = playerId
    if (window) {
      window.localStorage.setItem('app_playerId', playerId)
    }
  },
  setPlayerName(state, playerName) {
    state.playerName = playerName
    if (window) {
      window.localStorage.setItem('app_playerName', playerName)
    }
  },
  setMatchId(state, matchId) {
    state.matchId = matchId
  },
  setPlayerCredentials (state, playerCredentials) {
    state.playerCredentials = playerCredentials
    window.localStorage.setItem('app_playerCredentials', playerCredentials)
  },
}

export const actions = {
  init({ commit, state }) {
    this.$game.start(state.playerId, state.matchId)
    state.playerName = window.localStorage.getItem('app_playerName')
    state.playerId = window.localStorage.getItem('app_playerId')
  },
  async createMatch({ commit, state }, { numPlayers }) {
    const matchID = await this.$lobbyApi.createRoom(numPlayers)
    commit('setMatchId', matchID)
  },

  async listMatchs({ commit, state }, { numPlayers }) {
    const matchs = await this.$lobbyApi.listMatchs()
    commit('setMatchId', matchs)
  },

  async joinMatch({ commit, state }, { playerId, playerName }) {
    const { playerCredentials } = await this.$lobbyApi.joinRoom({
      matchID: state.matchId,
      playerID: playerId,
      playerName,
    })

    commit('setPlayerCredentials', playerCredentials)
    commit('setPlayerId', playerId)
  },
  drawCard({ commit, state }) {
    this.$game.client.moves.drawCard()
  },
}
