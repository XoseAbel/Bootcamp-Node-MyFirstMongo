import { body } from 'express-validator';

export const DTO_POST = [
  body('title').isString(),
  body('genres').optional().isArray(),
  body('genres[*]').optional().isString(),
  body('cast').isArray(),
  body('cast[*]').isString(),
  body('countries').isArray(),
  body('countries[*]').isString(),
  body('released', new Date()).isDate(),
  body('directors').isArray(),
  body('directors[*]').isString(),
  body('rated').isString(),
  body('awards.wins').isNumeric(),
  body('awards.nominations').isNumeric(),
  body('awards.text').isString(),
  body('year').isNumeric(),
  body('plot').isString(),
  body('fullplot').isString(),
];
