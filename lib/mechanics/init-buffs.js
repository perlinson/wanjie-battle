import SET from 'enums/set.enums';
import initCoreBuff from 'lib/buffs/core.buffs';

const initBuffs = (G, ctx, card, index) => {
  const { currentPlayer } = ctx;
  const { id, set } = card;

  switch (set) {
    case SET[1]:
      return initCoreBuff(G, currentPlayer, id, index);

    default:
      
  }
};

export default initBuffs;
