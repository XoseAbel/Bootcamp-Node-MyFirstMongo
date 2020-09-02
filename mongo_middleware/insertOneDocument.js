import { getClient } from '.';
import { MONGO_BBDD } from './const';

const insertOneDocument = async (collectionSelected, newData) => {
  const client = getClient();
  const results = {};

  try {
    await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionSelected);

    //añadimos a nuestra collection los nuevos datos
    const result = await collection.insertOne(newData);
    results.insertedId = { insertedId: result.insertedId };
  } catch (error) {
    console.error('ERROR: ', error);
    results.error = { error: 'Error insertando' };
  } finally {
    client.close();
  }
  return results;
};

export default insertOneDocument;
