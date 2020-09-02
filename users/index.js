import { getAllUsers } from './gets/getAllUsers';
import { DTO_POST } from './post/post.dto';
import { postUser } from './post/postUser';
import { deleteUser } from './delete/deleteUser';
import { USERS_ID_URL, USERS_URL } from '../const';

const init = app => {
  app.get(USERS_URL, getAllUsers);
  //añadir un usuario, post
  app.post(USERS_URL, DTO_POST, postUser);
  //eliminar un usuario, delete
  app.delete(USERS_ID_URL, deleteUser);
};

export default init;
