import { Dispatch, SetStateAction } from 'react';
import { Errors } from '../types/Errors';

export const handleError = (
  error: Errors,
  setError: Dispatch<SetStateAction<Errors>>,
) => {
  setError(error);

  setTimeout(() => {
    setError(Errors.DEFAULT);
  }, 3000);
};
