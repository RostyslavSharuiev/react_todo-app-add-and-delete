import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

import { addTodo, USER_ID } from '../../api/todos';
import { handleError } from '../../utils/handleError';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setError: Dispatch<SetStateAction<Errors>>;
  setTempTodo: Dispatch<SetStateAction<Todo | null>>;
}

const Header: FC<Props> = ({
  todos,
  tempTodo,
  setTodos,
  setError,
  setTempTodo,
}) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedTitle = title.trim();

    if (!formattedTitle) {
      handleError(Errors.TITLE_ERROR, setError);

      return;
    }

    const tmpTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: formattedTitle,
      completed: false,
    };

    setTempTodo(tmpTodo);

    const newTodo: Omit<Todo, 'id'> = {
      userId: USER_ID,
      title: formattedTitle,
      completed: false,
    };

    try {
      const todo = await addTodo(newTodo);

      setTodos(currentTodos => [...currentTodos, todo]);
      setTitle('');
      setTempTodo(null);
    } catch {
      setTempTodo(null);
      handleError(Errors.ADD_TODO, setError);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos, tempTodo]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all active', {})}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={title}
          onChange={handleChangeTitle}
          disabled={!!tempTodo}
        />
      </form>
    </header>
  );
};

export default Header;
