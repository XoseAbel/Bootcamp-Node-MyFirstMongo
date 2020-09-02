import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { FilterQueryMongo } from './auxiliar_functions/FilterQueryMongo';
import { OptionsQueryMongo } from './auxiliar_functions/OptionsQueryMongo';
import findDocuments from '../../mongo_middleware/findDocuments';

const getAllUsers = async (req, res) => {
  //variables de url
  const { name, email, limit = 5, offset = 0, sort_by, order } = req.query;

  //generamos la query de busqueda
  const queryFind = new FilterQueryMongo(name, email);

  //query para las opciones de find
  const optionsQuery = new OptionsQueryMongo(limit, offset, sort_by, order);

  const { error, data, count } = await findDocuments(
    MONGO_COL_USERS,
    queryFind,
    optionsQuery
  );

  error ? res.send({ error }) : res.send({ data, count, limit, offset });
};

export { getAllUsers };
