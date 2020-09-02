import { validationResult } from 'express-validator';
import { QueryPostDocument } from './auxiliarFunctions/QueryPostDocument';

const postMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //obtain query to post new object
  const {
    title,
    genres,
    cast,
    countries,
    released,
    directors,
    rated,
    year,
    plot,
    fullplot,
    awards,
  } = req.body;
  //generamos el objeto para añadir nueva movie
  const newMovie = new QueryPostDocument(
    title,
    genres,
    cast,
    countries,
    released,
    directors,
    rated,
    year,
    plot,
    fullplot,
    awards
  );

  const { insertedId, error } = await insertOneDocument(
    MONGO_COL_USERS,
    newMovie
  );

  error ? res.status(400).json(error) : res.status(200).json(insertedId);
};
export { postMovie };
