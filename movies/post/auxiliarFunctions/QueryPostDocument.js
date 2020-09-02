function QueryPostDocument(
  title,
  genres,
  cast,
  countries,
  released,
  directors,
  rated,
  year,
  plot,
  fullplot,
  awards
) {
  this.title = title;
  this.genres = genres;
  this.cast = cast;
  this.countries = countries;
  this.directors = directors;
  this.released = released;
  this.rated = rated;
  this.year = year;
  this.plot = plot;
  this.fullplot = fullplot;
  this.awards = awards;
  //no variables
  this.num_mflix_comments = 0;
}
export { QueryPostDocument };
