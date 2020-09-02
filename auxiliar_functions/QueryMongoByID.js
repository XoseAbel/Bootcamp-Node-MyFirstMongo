import { ObjectId } from 'mongodb';

function QueryMongoByID(id) {
  this._id = ObjectId(id);
}
export { QueryMongoByID };
