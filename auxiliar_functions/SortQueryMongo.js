function SortQueryMongo(sort_by, order) {
  if (sort_by) {
    order === 'desc' ? (this[sort_by] = -1) : (this[sort_by] = 1);
  }
}
export { SortQueryMongo };
