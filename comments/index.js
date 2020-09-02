import { getAllComments } from './gets/getAllComments';
import { COMMENTS_URL } from '../const';

const init = app => {
  app.get(COMMENTS_URL, getAllComments);
};

export default init;
