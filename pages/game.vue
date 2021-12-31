<template>
  <div>
    <h1>matchUrl : {{ matchUrl }}</h1>
    <button @click="drawCard">Draw Card</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GamePage',
  asyncData({ store, params}) {
    console.log('asyncData', params)
    return params
  },
  computed: {
    ...mapState('game', ['playerId', 'matchId', 'playerCredentials']),
    ...mapGetters('game', ['matchUrl']),
  },
  mounted() {
    this.$game.start(this.playerId, this.matchId, this.playerCredentials)
    this.$game.client.subscribe((state) =>
      this.$store.commit('game/setGameState', state)
    )
    // this.$store.dispatch('game/init')
  },
  methods: {
    drawCard() {
      this.$store.dispatch('game/drawCard')
    },
  },
}
</script>

<style></style>
