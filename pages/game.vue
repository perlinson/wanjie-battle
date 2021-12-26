<template>
  <div>
    <h1>matchUrl : {{matchUrl}}</h1>
    <button @click="drawCard">Draw Card</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GamePage',
  computed: {
    ...mapState('game', ['gamestate']),
    ...mapGetters('game', ['matchUrl']),
  },
  mounted() {
    this.$store.dispatch('game/init')
  },
  methods: {
    drawCard() {
      this.$store.dispatch('game/drawCard')
    }
  },
}
</script>

<style></style>
