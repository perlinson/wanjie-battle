export const state = () => ({
  matchs:[],
  playerName: null,
  credentials: null,
  showID: false,
  playerId: '',
  currentPlayerId: '',
  playerCredentials: '',
  matchId: '',
})

export const getters = {
  // matchUrl(state) {
  //   console.log(`${state.baseUrl}/?matchId=${state.matchId}`)
  //   return `${state.baseUrl}/?matchId=${state.matchId}`
  // },
}

export const mutations = {

  authenticate(state, user) {
    state.playerName = user
  },
  setCredentials(state, credentials) {
    state.credentials = credentials
  },
  clear(state) {
    state.playerName = null
    state.credentials = null
  },

  setGameState(state, gameState) {
    state.gamestate = gameState
    console.log('SET_GAMESTATE', gameState)
  },
  setMatchList(state, matchs) {
    state.matchs = [...matchs]
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
  async createMatch({ commit, state }, { numPlayers }) {
    state.wait = true
    const matchID = await this.$lobbyApi.createRoom(numPlayers)
    commit('setMatchId', matchID)
    state.wait = false
  },

  async listMatchs({ commit, state }) {
    const matchs = await this.$lobbyApi.listMatchs()
    commit('setMatchList', matchs)
  },

  async joinMatch({ commit, state }, {matchId}) {
    const { playerCredentials, playerID } = await this.$lobbyApi.joinRoom({
      matchID: matchId,
      playerName: state.playerName,
    })

    commit('setPlayerCredentials', playerCredentials)
    commit('setPlayerId', playerID)
  },

  gotoMatch({ commit, state }, matchId ) {
    this.$router.push({
        name: 'game',
        params: { matchID: matchId, playerID:state.playerID, playerCredentials: state.playerCredentials },
      })
  },

  drawCard({ commit, state }) {
    this.$game.client.moves.drawCard()
  },
}
