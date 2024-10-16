/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';

import { Header, TodoList, Footer, ErrorMessage, TodoItem } from './components';
import { FilterBy } from './types/FilterBy';
import { filterTodos } from './utils/FilterTodos';
import { useTodos } from './hooks/useTodos';

export const App: FC = () => {
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const {
    todos,
    error,
    isLoading,
    title,
    tempTodo,
    setTodos,
    setError,
    setIsLoading,
    handleError,
    handleRemoveError,
    handleAddTodo,
    handleDeleteTodo,
    setTitle,
    setTempTodo,
  } = useTodos();

  const [selectedFilter, setSelectedFilter] = useState<FilterBy>(FilterBy.ALL);
  // const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const filteredTodos = filterTodos(todos, selectedFilter);
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  const onAddTodo = (newTodo: Omit<Todo, Todo['id']>) => {
    handleAddTodo(newTodo);
    // setTempTodo(null);
  };

  const onDeleteTodo = (id: number) => {
    handleDeleteTodo(id);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          isAllTodosCompleted={isAllTodosCompleted}
          isLoading={isLoading}
          title={title}
          handleError={handleError}
          onAddTodo={onAddTodo}
          setTempTodo={setTempTodo}
          setTitle={setTitle}
        />

        <TodoList todos={filteredTodos} onDeleteTodo={onDeleteTodo} />

        {tempTodo && (
          <TodoItem
            todo={tempTodo}
            onDeleteTodo={handleDeleteTodo}
            isLoading={isLoading}
          />
        )}

        {!!todos.length && (
          <Footer
            selectedFilter={selectedFilter}
            todos={todos}
            onSelectFilter={setSelectedFilter}
          />
        )}
      </div>

      <ErrorMessage errorMessage={error} onClearError={handleRemoveError} />
    </div>
  );
};
