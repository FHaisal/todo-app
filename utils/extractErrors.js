import isEmpty from './isEmpty';

const extractErrors = serverErrors => {
  if (isEmpty(serverErrors)) return;

  let errors = {};

  serverErrors.forEach(error => errors[error.param] = error.msg);
  return errors;
};

export default extractErrors;