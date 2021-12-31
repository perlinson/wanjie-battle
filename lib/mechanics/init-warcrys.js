import SET from 'enums/set.enums';
import initCoreWarcry from 'lib/warcrys/core.warcrys';

const initWarcrys = (G, ctx, card, index) => {
  const { id, set } = card;

  switch (set) {
    case SET[1]:
      return initCoreWarcry(G, ctx, id, index);

    default:
      
  }
};

export default initWarcrys;
