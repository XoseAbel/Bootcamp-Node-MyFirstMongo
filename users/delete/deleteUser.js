import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { deleteOneDocument } from '../../mongo_middleware/deleteOneDocument';
import { QueryMongoByID } from '../../auxiliar_functions/QueryMongoByID';

const deleteUser = async (req, res) => {
  //obtenemos el id de los params
  const { id_user } = req.params;
  //construimos query de busqueda
  const queryId = new QueryMongoByID(id_user);

  const { result, error } = await deleteOneDocument(MONGO_COL_USERS, queryId);

  error ? res.status(400).json(error) : res.status(200).json(result);
};
export { deleteUser };
