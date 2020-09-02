import { validationResult } from 'express-validator';
import { MONGO_COL_MOVIES } from '../../mongo_middleware/const';
import updateOneDocument from '../../mongo_middleware/updateOneDocument';
import { QueryPutDocument } from './auxiliar_fuctions/QueryPutDocument';
import { QueryMongoByID } from '../../auxiliar_functions/QueryMongoByID';

const putMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //obtain id
  const { id_movie } = req.params;
  const queryFind = new QueryMongoByID(id_movie);
  //obtain query update
  const {
    title,
    genres = [],
    cast,
    countries = [],
    released,
    directors,
    rated = 'UNRATED',
    awards,
    year,
    plot,
    fullplot,
    type = 'movie',
    poster,
  } = req.body;
  //generamos el objeto para modificar nuestra movie
  const setUpdate = new QueryPutDocument(
    title,
    genres,
    cast,
    countries,
    released,
    directors,
    rated,
    awards,
    year,
    plot,
    fullplot,
    type,
    poster
  );

  console.log(setUpdate);
  const { error, update } = await updateOneDocument(
    MONGO_COL_MOVIES,
    queryFind,
    setUpdate
  );

  error ? res.status(400).json(error) : res.status(200).json(update);
};
export { putMovie };
