<template lang="pug">
.grid-container
  .grid-x
    .cell
      h1 Partite in corso
      table
        thead
          tr
            th Partita
            th 玩家
        tbody
          tr(v-if="!matches.length")
            td -
            td -
          tr(v-for="m in matches")
            td {{ m.matchID }}
            td
              .button-group
                template(v-for="(p, index) in m.players")
                  a.button.hollow(
                    v-if="p.name === $store.state.playerName"
                    @click="goToMatch(m.matchID, index, $store.state.credentials)"
                  ) {{ p.name }}
                  a.button.hollow.disabled(
                    v-else-if="p.name"
                  ) {{ p.name }}
                  a.button(
                    v-if="!p.name"
                    @click="joinMatch(m.matchID)"
                  ) 加入
    .cell
      h2 开始新游戏:
    .cell.medium-2
      label 玩家人数
        input(id="playerName" type="string" v-model="playerName")
        input(id="numplayers" type="number" v-model="numPlayers")
      a.button(
        @click="createMatch"
        :class="{disabled: wait}"
      ) 创建
</template>

<script>
import { LobbyClient } from 'boardgame.io/client'
import {mapActions} from 'vuex'
const lobbyClient = new LobbyClient({
  server:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : 'https://proloco-game.herokuapp.com',
})
export default {
  name: 'LobbyPage',
  data() {
    return {
      playerName: '',
      matches: [],
      numPlayers: 2,
      wait: false,
    }
  },
  async created() {
    await this.listMatches()
  },
  methods: {
    ...mapActions('lobby', []),
    async listMatches() {
      this.matches = (await lobbyClient.listMatches('WanJieBattle')).matches
    },
    async createMatch() {
      this.wait = true
      await lobbyClient.createMatch('WanJieBattle', {
        numPlayers: this.numPlayers,
      })
      await this.listMatches()
      this.wait = false
    },
    goToMatch(matchID, playerID, playerCredentials) {
      this.$router.push({
        name: 'game',
        params: { matchID, playerID, playerCredentials },
      })
    },
    async joinMatch(matchID) {
      const { playerCredentials, playerID } = await lobbyClient.joinMatch(
        'WanJieBattle',
        matchID,
        { playerName: this.playerName }
      )
      this.$store.commit('setCredentials', playerCredentials)
      window.localStorage.setItem(
        'proloco-credentials',
        JSON.stringify({
          playerName: this.playerName,
          credentials: playerCredentials,
        })
      )
      this.$router.push({
        name: 'game',
        params: { matchID, playerID, playerCredentials },
      })
    },
  },
}
</script>
