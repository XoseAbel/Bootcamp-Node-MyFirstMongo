import {
  MONGO_COL_MOVIES,
  MONGO_COL_COMMENTS,
} from '../../mongo_middleware/const';
import { connectMongo } from '../../mongo_middleware/connectMongoCallback';
import { FilterQueryMongo } from './auxiliar_functions/FilterQueryMongo';
import { SortQueryMongo } from '../../auxiliar_functions/SortQueryMongo';
import { PROJECTIONQUERY } from './const';

const getMoviesAggregate = async (req, res) => {
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
  //generamos nuestra query para filter, en esta caso para $match
  const matchQuery = new FilterQueryMongo(
    title,
    min_rating,
    max_rating,
    genres,
    min_year,
    max_year,
    qtyDirectors
  );

  //generamos query para ordenar
  let [sort_by, order] = sort.split('_');
  sort_by = sort_by === 'rating' ? 'imdb.rating' : sort_by;
  const sortQuery = new SortQueryMongo(sort_by, order);
  //fin query ordenar

  //offset value
  const offset = (+num_page - 1) * +pg_size;

  const { data, error } = await connectMongo(
    MONGO_COL_MOVIES,
    async collection => {
      try {
        const cursorAggregate = await collection.aggregate([
          { $match: matchQuery },
          { $sort: sortQuery },
          { $skip: offset },
          { $limit: +pg_size },
          { $project: PROJECTIONQUERY },
          {
            $lookup: {
              from: MONGO_COL_COMMENTS,
              localField: '_id',
              foreignField: 'movie_id',
              as: 'comments',
            },
          },
          { $addFields: { numComments: { $size: '$comments' } } },
        ]);
        const data = await cursorAggregate.toArray();
        return { data };
      } catch (error) {
        return error;
      }
    }
  );

  error
    ? res.status(400).json(error)
    : res.status(200).json({ data, pg_size, num_page });
};

export default getMoviesAggregate;
