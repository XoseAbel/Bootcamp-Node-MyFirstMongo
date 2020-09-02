import { MONGO_COL_MOVIES } from '../../mongo_middleware/const';
import { FilterQueryMongo } from './auxiliar_functions/FilterQueryMongo';
import { OptionsQueryMongo } from './auxiliar_functions/OptionsQueryMongo';
import findDocuments from '../../mongo_middleware/findDocuments';

const getAllMovies = async (req, res) => {
  //variables para filtrar
  //genres puede recibir varios parametros, como array -> genres=Drama&genres=Comedy
  //variables de paginacion y ordenacion
  const {
    title,
    min_rating,
    max_rating,
    genres,
    min_year,
    max_year,
    pg_size = 10,
    num_page = 1,
    sort = 'title_asc',
    qtyDirectors,
  } = req.query;

  //inicializamos la query de filtros
  const queryFind = new FilterQueryMongo(
    title,
    min_rating,
    max_rating,
    genres,
    min_year,
    max_year,
    qtyDirectors
  );
  //construimos las opciones de paginacion y orden
  const queryOptions = new OptionsQueryMongo(pg_size, num_page, sort);

  console.log(queryFind);

  const { error, data, count } = await findDocuments(
    MONGO_COL_MOVIES,
    queryFind,
    queryOptions
  );

  error ? res.send({ error }) : res.send({ data, count, pg_size, num_page });
};

export default getAllMovies;
