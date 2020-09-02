import { validationResult } from 'express-validator';
import { QueryMongoByID } from '../../auxiliar_functions/QueryMongoByID';
import { MONGO_COL_MOVIES } from '../../mongo_middleware/const';
import { QueryPatchDocument } from './auxiliarFunction/QueryPatchDocument';
import updateOneDocument from '../../mongo_middleware/updateOneDocument';

const patchMovies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //obtain id
  const { id_movie } = req.params;
  const queryFind = new QueryMongoByID(id_movie);
  //obtain query update
  const { op, value } = req.body;
  //generamos el objeto para modificar nuestra movie, en funcion de la op y el valor
  const setUpdate = new QueryPatchDocument(op, value);

  console.log(setUpdate);
  const { error, update } = await updateOneDocument(
    MONGO_COL_MOVIES,
    queryFind,
    setUpdate
  );

  error ? res.status(400).json(error) : res.status(200).json(update);
};
export { patchMovies };
