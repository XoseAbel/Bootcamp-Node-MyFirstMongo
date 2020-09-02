import { MONGO_COL_MOVIES } from '../../mongo_middleware/const';
import findOneDocument from '../../mongo_middleware/findOneDocument';
import { QueryMongoByID } from '../../auxiliar_functions/QueryMongoByID';

const getOneMovie = async (req, res) => {
  //obtenemos el id de la url
  const { id_movie } = req.params;
  //construimos query busqueda
  const queryFind = new QueryMongoByID(id_movie);

  const { error, data } = await findOneDocument(MONGO_COL_MOVIES, queryFind);

  error ? res.send(error) : res.send(data);
};

export default getOneMovie;
