<template>
  <div class="content">
    <div class="typewriter">
      <h1>Dominó.</h1>
    </div>
    <div class="user-form">
      <div class="form-input">
        <span> name</span>
        <input id="" v-model="playerName" type="text" name="" />
      </div>
      <div class="form-input">
        <span> seat</span>
        <select v-model="playerId">
          <option value="0">1</option>
          <option value="1">2</option>
        </select>
      </div>
      <input
        v-if="matchID"
        type="button"
        value="join"
        class="form-btn"
        @click="enterGame"
      />
      <input type="button" value="new" class="form-btn" @click="newGame" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {}
  },
  computed: {
    matchID: {
      get() {
        return this.$store.state.game.matchId
      },
      set(value) {
        this.$store.commit('game/setMatchId', value)
      },
    },
    playerId: {
      get() {
        return this.$store.state.game.playerId
      },
      set(value) {
        console.log('set playerId', value)
        this.$store.commit('game/setPlayerId', value)
      },
    },
    playerName: {
      get() {
        return this.$store.state.game.playerName
      },
      set(value) {
        this.$store.commit('game/setPlayerName', value)
      },
    },
  },
  mounted() {
    this.matchID = this.$route.query.matchId
    if (this.$game.client) {
      this.$game.client.stop()
    }
  },
  methods: {
    async newGame() {
      await this.$store.dispatch('game/createMatch', { numPlayers: 2 })
      await this.enterGame()
    },
    async enterGame() {
      try {
        await this.$store.dispatch('game/joinMatch', {
          playerId: this.playerId,
          playerName: this.playerName,
        })
        this.$router.push('game')
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
