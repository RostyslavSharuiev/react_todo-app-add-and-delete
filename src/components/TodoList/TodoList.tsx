import { Dispatch, FC, SetStateAction } from 'react';

import { Todo } from '../../types/Todo';

import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  idsForDelete: number[];
  setIdsForDelete: Dispatch<SetStateAction<number[]>>;
}

export const TodoList: FC<Props> = ({
  todos,
  idsForDelete,
  setIdsForDelete,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          idsForDelete={idsForDelete}
          setIdsForDelete={setIdsForDelete}
        />
      ))}
    </section>
  );
};
