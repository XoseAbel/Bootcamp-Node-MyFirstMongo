function FilterQueryMongo(
  title,
  min_rating,
  max_rating,
  genres,
  min_year,
  max_year,
  qtyDirectors
) {
  //busqueda dentro del titulo el string facilitado
  if (title) {
    this.title = { $regex: `${title}` };
  }

  //añadimos rating min, como esta dentro de un objeto lo pasamos por cochetes
  if (min_rating) {
    this['$and'] = [{ ['imdb.rating']: { $gte: +min_rating } }];
  }
  //como es una condicion adicional, hacemos un stread operator para heredar las condiciones previas
  if (max_rating) {
    this['$and'] = this.$and
      ? [...this.$and, { ['imdb.rating']: { $lte: +max_rating } }]
      : [{ ['imdb.rating']: { $lte: +max_rating } }];
  }

  //busqueda en array de un string sin tener en cuenta mayus/minus
  //que contenga la palabra tal cual
  if (genres) {
    //generamos un array con la/s opcion/es
    genres = typeof genres === 'string' ? genres.split(',') : genres;
    //para evitar problemas de mayus/minus le tenemos que pasar una expresion regular generada en JS
    //$in no evalua $regex, por eso debemos usar esta alternativa
    let optRegexp = genres.map(genre => new RegExp(genre, 'i'));
    this.genres = { $in: optRegexp };
  }

  //se debe anidar dentro de and las nuevas condiciones de rangos
  if (min_year) {
    this['$and'] = this.$and
      ? [...this.$and, { year: { $gte: +min_year } }]
      : [{ year: { $gte: +min_year } }];
  }
  //se debe anidar dentro de and las nuevas condiciones de rangos
  if (max_year) {
    this['$and'] = this.$and
      ? [...this.$and, { year: { $lte: +max_year } }]
      : [{ year: { $lte: +max_year } }];
  }
  //parte cuatro, verificar que un array tenga una longitud exacta
  if (qtyDirectors) {
    this.directors = { $size: +qtyDirectors };
  }
}
export { FilterQueryMongo };
