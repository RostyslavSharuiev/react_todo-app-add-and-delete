import { useCallback, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { addTodo, deleteTodo, getTodos } from '../api/todos';
import { Errors } from '../types/Errors';

const initialLoadingState = {
  fetching: false,
  adding: false,
  deleting: false,
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const handleRemoveError = () => {
    setError(null);
  };

  const handleError = useCallback((error: Errors) => {
    setError(error);

    setTimeout(handleRemoveError, 3000);
  }, []);

  const handleAddTodo = (newTodo: Omit<Todo, Todo['id']>) => {
    setIsLoading(prev => ({ ...prev, adding: true }));
    handleError(Errors.DEFAULT);

    const tmp: Todo = { id: 0, ...newTodo };

    setTempTodo(tmp);

    addTodo(newTodo)
      .then(todo => {
        setTodos(currentTodos => [...currentTodos, todo]);
        setTitle('');
      })
      .catch(() => handleError(Errors.ADD_TODO))
      .finally(() => {
        setIsLoading(initialLoadingState);
        setTempTodo(null);
      });
  };

  const handleDeleteTodo = async (id: number) => {
    setIsLoading(prev => ({ ...prev, deleting: true }));
    handleError(Errors.DEFAULT);

    try {
      await deleteTodo(id);

      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id);
      });
    } catch {
      handleError(Errors.DELETE_TODO);
    } finally {
      setIsLoading(initialLoadingState);
    }

    // deleteTodo(id)
    //   .then(() =>
    //     setTodos(currentTodos => {
    //       return currentTodos.filter(todo => todo.id !== id);
    //     }),
    //   )
    //   .catch(() => handleError(Errors.DELETE_TODO))
    //   .finally(() => {
    //     setIsLoading(prev => ({ ...prev, deleting: false }));
    //   });
  };

  console.log(isLoading);

  useEffect(() => {
    setIsLoading(prev => ({ ...prev, fetching: true }));
    handleError(Errors.DEFAULT);

    getTodos()
      .then(setTodos)
      .catch(() => handleError(Errors.LOAD_ERROR))
      .finally(() => setIsLoading(initialLoadingState));
  }, [handleError]);

  return {
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
  };
};
