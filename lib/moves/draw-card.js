const drawCard = (G, ctx, amountToDraw = 1) => {
  const { currentPlayer } = ctx

  return amountToDraw >= 2
    ? drawMultipleCards(G, currentPlayer, amountToDraw)
    : drawSingleCard(G, currentPlayer)
}

// prettier-ignore
export const drawSingleCard = (G, player) => {
  
  // if (G.players[player].deck.length === 0) return;  // eject if deck is empty
  // if (G.players[player].hand.length === 10) return; // eject if hand is full

  // counts.deincrementDeck(G, player); // .............. set counts[player].deck
  // counts.incrementHand(G, player); // ................ set counts[player].hand
  
  G.players[player].hand.push( // .................... pushes to hand
    'card'
  );
}

export const drawMultipleCards = (G, player, amountToDraw) => {
  for (let i = 0; i < amountToDraw; i++) drawSingleCard(G, player)
}

export default drawCard
