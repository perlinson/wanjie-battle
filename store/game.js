const BASE_URL = process.env.NUXT_ENV_BASE_URL || 'http://localhost:3000'

export const state = () => ({
  playerName: '',
  playerId: '',
  currentPlayerId: '',
  client: null,
  matchID: '',
  baseUrl: BASE_URL,
})

export const getters = {
  matchUrl(state) {
    console.log(`${state.baseUrl}/?matchId=${state.matchID}`)
    return `${state.baseUrl}/?matchId=${state.matchID}`
  },
}

export const mutations = {
  SET_GAMESTATE(state, gamestate) {
    state.gamestate = gamestate
    console.log('SET_GAMESTATE', gamestate)
  },
  SET_PLAYER_ID(state, playerId) {
    state.playerId = playerId
    if (window) {
      window.localStorage.setItem('app_playerId', playerId)
    }
  },
  SET_PLAYER_NAME(state, playerName) {
    state.playerName = playerName
    if (window) {
      window.localStorage.setItem('app_playerName', playerName)
    }
  },
  SET_MATCH_ID(state, matchID) {
    state.matchID = matchID
  },
}

export const actions = {
  init({ commit, state }) {
    this.$game.client.start()
    state.playerName = window.localStorage.getItem('app_playerName')
    state.playerId = window.localStorage.getItem('app_playerId')
    this.$game.client.subscribe((state) => {
      commit('SET_GAMESTATE', state)
    })
  },
  async createMatch({ commit, state }, { numPlayers }) {
    const matchID = await this.$lobbyApi.createRoom(numPlayers)
    commit('SET_MATCH_ID', matchID)
  },
  async joinMatch({ commit, state }, { playerID, playerName }) {
    await this.$lobbyApi.joinRoom({
      matchID: state.matchID,
      playerID,
      playerName,
    })
  },
  drawCard({ commit, state }) {
    this.$game.client.moves.drawCard()
  },
}
