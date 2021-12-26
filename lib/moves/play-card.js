const playCard = (G, ctx, player, amountToDraw = 1) => {
  return playSingleCard(G, ctx, player)
}

export const playSingleCard = (G, player) => {
  // if (G.players[player].deck.length === 0) return // eject if deck is empty
  // if (G.players[player].hand.length === 10) return // eject if hand is full

  G.players[player].hand.push(
    // .................... pushes to hand
    'card'
  )
}

export default playCard
