import { ChangeEvent, FC, FormEvent, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

import { USER_ID } from '../../api/todos';
import { useTodos } from '../../hooks/useTodos';

interface Props {
  todos: Todo[];
  isAllTodosCompleted: boolean;
  isLoading: {
    fetching: boolean;
    adding: boolean;
    deleting: boolean;
  };
  title: string;
  handleError: (error: Errors) => void;
  onAddTodo: (todo: Omit<Todo, Todo['id']>) => void;
  setTempTodo: (todo: Todo | null) => void;
  setTitle: (title: string) => void;
}

const Header: FC<Props> = ({
  isAllTodosCompleted,
  isLoading,
  title,
  todos,
  handleError,
  onAddTodo,
  setTempTodo,
  setTitle,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedTitle = title.trim();

    if (!formattedTitle) {
      handleError(Errors.TITLE_ERROR);

      return;
    }

    const tempTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: formattedTitle,
      completed: false,
    };

    setTempTodo(tempTodo);

    const newTodo: Omit<Todo, Todo['id']> = {
      userId: USER_ID,
      title: formattedTitle,
      completed: false,
    };

    onAddTodo(newTodo);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos, isLoading.adding]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAllTodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
          disabled={isLoading.adding}
          ref={inputRef}
        />
      </form>
    </header>
  );
};

export default Header;
