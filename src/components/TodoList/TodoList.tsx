import { FC } from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
}

export const TodoList: FC<Props> = ({ todos, onDeleteTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </section>
  );
};
