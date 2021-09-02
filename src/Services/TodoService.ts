import axios from 'axios';

import { Priority } from '../Components/Task/Task';

export const getTodos = async() => {
    const response = await axios.get('http://localhost:3001/todos');

    return response.data;
}

export const getTodoById = async(id: string) => {
    const response = await axios.get(`http://localhost:3001/todos/${id}`);

    return response.data;
}

export const createTodo = async(todo: {
    description: string;
    dueDate: Date;
    priority: Priority;
}) => {
    const response = await axios.post(`http://localhost:3001/todos/`, todo);

    return response.data;
}

export const updateTodo = async(todo: 
    {
        id: string
        description?: string | undefined;
        dueDate?: Date | undefined;
        priority?: Priority | undefined;
        isComplete?: boolean | undefined;
    }
) => {
    const response = await axios.patch(`http://localhost:3001/todos/${todo.id}`, todo);

    return response.data;
}

export const deleteTodo = async(id: string) => {
    const response = await axios.delete(`http://localhost:3001/todos/${id}`);

    return response.data; 
}