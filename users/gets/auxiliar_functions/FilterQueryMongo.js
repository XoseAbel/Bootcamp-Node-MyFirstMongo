function FilterQueryMongo(name, email) {
  if (name) {
    this.name = { $regex: `${name}`, $options: 'i' };
  }
  if (email) {
    this.email = { $regex: `${email}`, $options: 'i' };
  }
}
export { FilterQueryMongo };
