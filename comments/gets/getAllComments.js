import { MONGO_COL_COMMENTS } from '../../mongo_middleware/const';
import { FindQueryMongo } from './auxiliar_functions/FindQueryMongo';
import findDocuments from '../../mongo_middleware/findDocuments';
import { OptionsQueryMongo } from '../../users/gets/auxiliar_functions/OptionsQueryMongo';

const getAllComments = async (req, res) => {
  //variables para filtrar
  const {
    name,
    email,
    min_date,
    max_date,
    limit = 10,
    offset = 0,
    sort_by,
    order,
  } = req.query;
  //generamos la query para filtrar en nuestro find
  let queryFind = new FindQueryMongo(name, email, min_date, max_date);
  //generamos query de opciones
  const queryOptions = new OptionsQueryMongo(limit, offset, sort_by, order);

  const { error, data, count } = await findDocuments(
    MONGO_COL_COMMENTS,
    queryFind,
    queryOptions
  );

  error ? res.send({ error }) : res.send({ data, count, limit, offset });
};

export { getAllComments };
