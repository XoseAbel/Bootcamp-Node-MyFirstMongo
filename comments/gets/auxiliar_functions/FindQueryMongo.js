function FindQueryMongo(name, email, min_date, max_date) {
  //busqueda dentro del nombre el string facilitado, no evaluar mayus/minus
  if (name) {
    this.name = { $regex: `${name}`, $options: 'i' };
  }
  //busqueda dentro del email el string facilitado, no evaluar mayus/minus
  if (email) {
    this.email = { $regex: `${email}`, $options: 'i' };
  }
  //buscamos rango dentro de la fechas, hay que convertir a por defecto javascript
  //ejemplo new Date('2010-10-17') === 2010-10-17T00:00:00.000Z
  if (min_date) {
    this['$and'] = [{ date: { $gte: new Date(min_date) } }];
  }
  if (max_date) {
    this.$and = this.$and
      ? [...this.$and, { date: { $lte: new Date(max_date) } }]
      : [{ date: { $lte: new Date(max_date) } }];
  }
}
export { FindQueryMongo };
