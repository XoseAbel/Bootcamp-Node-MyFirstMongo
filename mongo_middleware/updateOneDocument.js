import { getClient } from '.';
import { MONGO_BBDD } from './const';

const updateOneDocument = async (
  collectionSelected,
  queryFind,
  setUpdate,
  queryOption
) => {
  const client = getClient();
  const result = {};
  try {
    await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionSelected);

    //lanzamos update con el ID, todos los campos a modificar y las optiones
    const {
      modifiedCount,
      upsertedId,
      upsertedCount,
      matchedCount,
    } = await collection.updateOne(queryFind, setUpdate, queryOption);
    result.update = { modifiedCount, upsertedId, upsertedCount, matchedCount };
  } catch (error) {
    console.error('ERROR: ', error);
    result = { error: 'Fatal error, when PUT document' };
  } finally {
    client.close();
  }
  return result;
};

export default updateOneDocument;
