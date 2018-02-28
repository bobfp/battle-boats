import { union } from 'folktale/adt/union';

const action = union('Action', {
  Initial(player, boatsWaiting, boatCoords) {
    return { player, boatsWaiting, boatCoords };
  },
  BoatPlacementStart(coord) {
    return { coord };
  },
  BoatPlacementEnd(coord) {
    return { coord };
  },
  BoatPlacementSuccess(coord) {
    return { coord };
  },
  NoOp() {
    return {};
  }
});

export default action;
