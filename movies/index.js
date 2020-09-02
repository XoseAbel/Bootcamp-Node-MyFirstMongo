import getAllMovies from './gets/getAllMovies';
import getOneMovie from './gets/getOneMovie';
import { putMovie } from './put/putMovie';
import { PUT_VALIDATION } from './put/auxiliar_fuctions/putValidation';
import { DTO_PATCH } from './patch/patch.dto';
import { patchMovies } from './patch/patchMovies';
import { postMovie } from './post/postMovie';
import { DTO_POST } from './post/post.dto';
import { MOVIES_URL, MOVIES_ID_URL, GENRES_URL } from '../const';
import getMoviesAggregate from './gets/getAllMoviesAggregate';
import { getGenres } from './gets/getGenres';

const init = app => {
  //gets for movies
  app.get(MOVIES_URL, getAllMovies);
  app.get('/moviesAggregate', getMoviesAggregate);
  app.get(MOVIES_ID_URL, getOneMovie);
  //put for movies
  app.put(MOVIES_ID_URL, PUT_VALIDATION, putMovie);
  //patch for movies
  app.patch(MOVIES_ID_URL, DTO_PATCH, patchMovies);
  //post for movies
  app.post(MOVIES_URL, DTO_POST, postMovie);
  //aggregate
  app.get(GENRES_URL, getGenres);
};

export default init;
