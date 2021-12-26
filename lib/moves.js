import playCard from '../lib/moves/play-card'
import drawCard from '../lib/moves/draw-card'
export default {
  drawCard: {
    client: false,
    move: (G, ctx, amountToDraw) => {
      return drawCard(G, ctx, amountToDraw)
    },
  },
  playCard: {
    client: false,
    move: playCard,
  },
}
