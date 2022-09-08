import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {

  return (req, res, next) => {

    validate(plainToClass(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = extractErrors(errors)
          // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}


function extractErrors(errors) {
  var child = null;
  var message = '';
  errors.map((e: ValidationError) => {

    if (e.children)
      child = e.children

    if (e.constraints)
      message += Object.values(e.constraints) + ', '

    while (child && child.length) {
      child.forEach(nestedError => {

        if (nestedError.children) {

          if (nestedError.constraints)
            message += Object.values(nestedError.constraints) + ', '

          child = nestedError.children
        }
        else {
          child = null
        }
      });
    }
  })

  return message;
}


export default validationMiddleware;
