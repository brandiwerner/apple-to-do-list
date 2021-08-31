import React from 'react';

import { Task, TaskItem } from '../../Components/Task/Task';

interface TaskListProps {
    tasks: TaskItem[];
}

export const TaskList = ({tasks}: TaskListProps):JSX.Element => {
    const renderTasks = (): JSX.Element => {
        return (
            <>
                {tasks.map((task, index) => 
                    <Task
                        key={`${task.text}-${index}`}
                        text={task.text}
                        isComplete={task.isComplete}
                        priority={task.priority}
                    />
                )}
            </>
        )
    }

    return (
        <>
            {renderTasks()}
        </>
    );
}