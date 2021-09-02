import axios from "axios";

import { Priority } from "../Components/Task/Task";

/**
 * Get all todos from the api
 * @returns Array of ToDos
 */
export const getTodos = async () => {
  const response = await axios.get("http://localhost:3001/todos");

  return response.data;
};

/**
 * Get one todo by id from the api
 * @param id id of todo to get
 * @returns todo requested
 */
export const getTodoById = async (id: string) => {
  const response = await axios.get(`http://localhost:3001/todos/${id}`);

  return response.data;
};

/**
 * Send new todo to api to get created
 * @param todo New todo object data
 * @returns the todo created by the api
 */
export const createTodo = async (todo: {
  description: string;
  dueDate: Date;
  priority: Priority;
}) => {
  const response = await axios.post(`http://localhost:3001/todos/`, todo);

  return response.data;
};

/**
 * Update a todo with data passed in
 * @param todo the todo to be updated and the data to update
 * @returns the updated todo
 */
export const updateTodo = async (todo: {
  id: string;
  description?: string | undefined;
  dueDate?: Date | undefined;
  priority?: Priority | undefined;
  isComplete?: boolean | undefined;
}) => {
  const response = await axios.patch(
    `http://localhost:3001/todos/${todo.id}`,
    todo
  );

  return response.data;
};

/**
 * Make call to api to delete the todo
 * @param id id of todo to delete
 * @returns Message of successful deletion
 */
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`http://localhost:3001/todos/${id}`);

  return response.data;
};
