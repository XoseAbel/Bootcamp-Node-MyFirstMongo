function QueryPutDocument(
  title,
  genres,
  cast,
  countries,
  released,
  directors,
  rated,
  awards,
  year,
  plot,
  fullplot,
  type,
  poster
) {
  this.$set = {
    title,
    genres,
    cast,
    countries,
    released: new Date(released),
    directors,
    rated,
    awards,
    year,
    plot,
    fullplot,
    type,
    poster,
  };
}
export { QueryPutDocument };
