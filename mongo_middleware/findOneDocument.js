import { getClient } from '.';
import { MONGO_BBDD } from './const';

const findOneDocument = async (collectionSelected, idQuery) => {
  const client = getClient();

  let result = {};
  try {
    await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionSelected);

    //lanzamos consulta a Mongo con los requisitos que nos ha facilitado FrontEnd
    const results = await collection.findOne(idQuery);

    result.data = results;
  } catch (error) {
    console.error('ERROR: ', error);
    result.error = { error: 'Fatal error, when find one document' };
  } finally {
    client.close();
  }
  return result;
};

export default findOneDocument;
