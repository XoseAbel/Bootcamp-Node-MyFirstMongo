import { body } from 'express-validator';
import {
  UPDATETITLE,
  ADDGENRE,
  REMOVEGENRE,
  LASTUPDATE,
  ADDNOMINATIONS,
  NUMBER,
  STRING,
} from '../../const';

export const DTO_PATCH = [
  body('op').isIn([
    UPDATETITLE,
    ADDGENRE,
    REMOVEGENRE,
    LASTUPDATE,
    ADDNOMINATIONS,
  ]),

  body('op').custom((op, { req }) => {
    if (op === ADDNOMINATIONS && typeof req.body.value !== NUMBER) {
      throw new Error('value is not a number');
    }
    return true;
  }),
  body('op').custom((op, { req }) => {
    if (op !== ADDNOMINATIONS && typeof req.body.value !== STRING) {
      throw new Error('value is not a string');
    }
    return true;
  }),
];
