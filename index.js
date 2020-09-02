import express from 'express';
import initMovies from './movies';
import initUsers from './users';
import initComments from './comments';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initMovies(app);
initUsers(app);
initComments(app);

app.listen(PORT, () => {
  console.log('App listening on port: ' + PORT);
});
