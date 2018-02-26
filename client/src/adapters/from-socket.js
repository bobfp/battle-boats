import ServerActions from '../../../server/src/actions.js';
import actions from './../actions.js';
import Result from 'folktale/result';
import { pipe } from 'ramda';

function fromSocketHandler(event, store) {
  pipe(event => serializer(event, ServerActions), actionMapper, action =>
    dispatchAction(action, store)
  )(event);
}

function serializer(event, union) {
  return Result.try(() => union.fromJSON(JSON.parse(event.data)));
}

function actionMapper(ServerActionResult) {
  console.log(ServerActionResult);
  // Handle default action incase of error from websocket
  const serverAction = ServerActionResult.matchWith({
    Ok: ({ value }) => value,
    Error: () => ServerActions.NoOp()
  });

  // map server actions to client actions
  return serverAction.matchWith({
    Initial: ({ player }) => actions.Initial(player),
    NoOp: () => actions.NoOp()
  });
}

function dispatchAction(action, store) {
  store.dispatch(action);
}

export { serializer, actionMapper, fromSocketHandler };