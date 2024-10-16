import { FC } from 'react';
import cn from 'classnames';

interface Props {
  isLoading: {
    fetching: boolean;
    adding: boolean;
    deleting: boolean;
  };
}

export const Loader: FC<Props> = ({ isLoading }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={cn('modal overlay', {
        'is-active': isLoading.adding,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
