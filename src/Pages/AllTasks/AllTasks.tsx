import { Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { TaskList } from '../../Components/TaskList/TaskList';
import { CreateTask } from '../../Components/CreateTask/CreateTask';
import { getTodos } from '../../Services/TodoService';

export const AllTasks = ():JSX.Element => {
    const { data, error, isLoading } = useQuery('todos', async () => {
        const data = await getTodos();
        console.log(JSON.stringify(data, null, 2))
        return data
    })

    return (
        <>
            <Heading as="h1">All Tasks</Heading>
            { data ? (
                <TaskList tasks={data}/>
            ) : null}
            
            <CreateTask />
        </>
    );
}