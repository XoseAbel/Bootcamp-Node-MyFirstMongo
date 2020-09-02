import { MONGO_COL_MOVIES } from '../../mongo_middleware/const';
import { connectMongo } from '../../mongo_middleware/connectMongoCallback';

const getGenres = async (req, res) => {
  const { data, error } = await connectMongo(
    MONGO_COL_MOVIES,
    async collection => {
      try {
        const cursorAggregate = await collection.aggregate([
          { $unwind: '$genres' },
          {
            $group: {
              _id: { $toUpper: '$genres' },
            },
          },
          {
            $group: {
              _id: 'result',
              data: { $push: '$_id' },
            },
          },
        ]);
        const data = await cursorAggregate.toArray();
        return data[0];
      } catch (error) {
        return error;
      }
    }
  );

  error ? res.status(400).json(error) : res.status(200).json({ data });
};
export { getGenres };
