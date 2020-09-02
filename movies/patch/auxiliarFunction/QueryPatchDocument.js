import {
  UPDATETITLE,
  ADDGENRE,
  REMOVEGENRE,
  LASTUPDATE,
  ADDNOMINATIONS,
} from '../../../const';

function QueryPatchDocument(op, value) {
  const strategy = {
    [UPDATETITLE]: () => ({ $set: { title: value } }),
    [ADDGENRE]: () => ({ $addToSet: { genres: value } }),
    [REMOVEGENRE]: () => ({ $pull: { genres: value } }),
    [LASTUPDATE]: () => ({ $currentDate: { lastupdated: true } }),
    [ADDNOMINATIONS]: () => ({ $inc: { ['awards.nominations']: +value } }),
  };

  return strategy[op] ? strategy[op]() : null;
}
export { QueryPatchDocument };
