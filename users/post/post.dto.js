import { body } from 'express-validator';

export const DTO_POST = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
];
