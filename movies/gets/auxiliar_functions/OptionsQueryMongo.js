import { SortQueryMongo } from '../../../auxiliar_functions/SortQueryMongo';
import { PROJECTIONQUERY } from '../const';

function OptionsQueryMongo(pg_size, num_page, sort) {
  //pagination
  this.limit = +pg_size;
  this.skip = (+num_page - 1) * +pg_size;
  //sort
  let [sort_by, order] = sort.split('_');
  //Clausula para convertir rating a imdb.rating
  sort_by = sort_by === 'rating' ? 'imdb.rating' : sort_by;
  this.sort = new SortQueryMongo(sort_by, order);

  //parametros a mostrar, requeridos por el cliente
  this.projection = PROJECTIONQUERY;
}

export { OptionsQueryMongo };
