import { getClient } from '.';
import { MONGO_BBDD } from './const';

const deleteOneDocument = async (collectionSelected, idQuery) => {
  let results = {};
  let client = getClient();
  try {
    client = await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionSelected);

    //borramos el elemento que nos indican
    collection.deleteOne(idQuery);
    results.result = 'Eliminado con exito';
  } catch (error) {
    console.error('ERROR: ', error);
    results.error = 'Fatal error, when delete a document';
  } finally {
    client.close();
  }
  return results;
};
export { deleteOneDocument };
