import React from 'react';
import { Heading } from '@chakra-ui/react';

import { TaskList } from '../../Components/TaskList/TaskList';
import { TaskItem } from '../../Components/Task/Task';
import { CreateTask } from '../../Components/CreateTask/CreateTask';

const tasks: TaskItem[] = [
    { text: 'Clean the never ending dishes', isComplete: false, priority: 2 },
    { text: 'Go for a long walk on a beach', isComplete: false, priority: 1 },
    { text: 'Complete coding challenge', isComplete: false, priority: 3 }
];

export const AllTasks = ():JSX.Element => {
    return (
        <>
            <Heading as="h1">All Tasks</Heading>
            <TaskList tasks={tasks}/>
            <CreateTask />
        </>
    );
}