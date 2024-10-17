import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';

export const getFilteredTodos = (todos: Todo[], filter: FilterBy) => {
  const filterCallbacks = {
    [FilterBy.ALL]: () => true,
    [FilterBy.ACTIVE]: (todo: Todo) => !todo.completed,
    [FilterBy.COMPLETED]: (todo: Todo) => todo.completed,
  };

  return todos.filter(filterCallbacks[filter]);
};
