import { validationResult } from 'express-validator';
import { QueryPostUser } from './auxiliarFunctions/QueryPostUser';
import { sha256 } from 'js-sha256';
import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import insertOneDocument from '../../mongo_middleware/insertOneDocument';
import { connectMongo } from '../../mongo_middleware/connectMongoCallback';

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //obtain query to post new object
  const { name, email, password } = req.body;
  //encriptamos el password
  const newPass = sha256(password);
  //generamos el objeto para añadir nueva movie
  const newUser = new QueryPostUser(name, email, newPass);

  console.log(newUser);
  // const { insertedId, error } = await insertOneDocument(
  //   MONGO_COL_USERS,
  //   newUser
  // );

  //hemos generado una fn generica para hacer todas las consultas a Mongo, los parametros son:
  // 1) es la coleccion en la que queremos trabajar
  // 2) es una callback cuyo parametro el la collection en la cual podemos trabajar
  const { error, resolve } = await connectMongo(
    MONGO_COL_USERS,
    async collection => {
      try {
        const { insertedId } = await collection.insertOne(newUser);
        return { resolve: { insertedId } };
      } catch (error) {
        console.error('ERROR: ', error);
        return { error: { error: 'error insertOne' } };
      }
    }
  );

  error ? res.status(400).json(error) : res.status(200).json(resolve);
};
export { postUser };
