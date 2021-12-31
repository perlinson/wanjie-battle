export const state = () => ({
  playerName: null,
  credentials: null,
  showID: false,
})

export const getters = {
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
}

export const actions = {}
