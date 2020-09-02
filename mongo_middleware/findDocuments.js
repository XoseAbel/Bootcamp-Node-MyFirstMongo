import { MONGO_BBDD } from './const';
import { getClient } from '.';

const findDocuments = async (collectionChose, queryFind, queryOptions) => {
  const client = getClient();
  let results = {};

  try {
    await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionChose);

    //lanzamos consulta a Mongo con los requisitos que nos ha facilitado FrontEnd
    const cursor = collection.find(queryFind, queryOptions);

    results.data = await cursor.toArray();
    results.count = await cursor.count();
  } catch (error) {
    console.error('ERROR: ', error);
    results = { error: 'Fatal error, when find documents' };
  } finally {
    client.close();
  }
  return results;
};

export default findDocuments;
