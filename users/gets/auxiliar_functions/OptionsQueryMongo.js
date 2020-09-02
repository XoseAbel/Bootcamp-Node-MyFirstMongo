import { SortQueryMongo } from '../../../auxiliar_functions/SortQueryMongo';

function OptionsQueryMongo(limit, offset, sort_by, order) {
  //pagination
  this.limit = +limit;
  this.skip = +offset;
  //generamos la query de ordenacion
  if (sort_by) {
    this.sort = new SortQueryMongo(sort_by, order);
  }
}
export { OptionsQueryMongo };
