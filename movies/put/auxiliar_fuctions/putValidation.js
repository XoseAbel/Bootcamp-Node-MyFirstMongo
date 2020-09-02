import { body } from 'express-validator';

export const PUT_VALIDATION = [
  body('title').isString(),
  body('genres').optional().isArray(),
  //para cada genero debemos recibir un String
  body('genres[*]').optional().isString(),
  body('cast').isArray(),
  body('cast[*]').isString(),
  body('countries').isArray(),
  body('countries[*]').isString(),
  body('released', new Date()).isDate(),
  body('directors').isArray(),
  body('directors[*]').isString(),
  body('rated').optional().isString(),
  body('awards.wins').optional().isNumeric(),
  body('awards.nominations').optional().isNumeric(),
  body('awards.text').optional().isString(),
  body('year').isNumeric(),
  body('plot').isString(),
  body('fullplot').isString(),
  body('type').optional().isString(),
  body('poster').optional().isString(),
];
