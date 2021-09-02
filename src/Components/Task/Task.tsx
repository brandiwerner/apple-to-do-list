import { useState } from 'react';
import { GrFormTrash } from 'react-icons/gr';
import { Box, Checkbox, Text } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { deleteTodo } from '../../Services/TodoService';

import './Task.scss';
export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export interface TaskItem {
    description: string,
    isComplete: boolean,
    priority: Priority, 
    id: string,
    dueDate: string
};

export const Task = (props: TaskItem):JSX.Element => {
    const { id, description, isComplete, priority } = props;

    // TODO: Determine if isCompleted via database
    const [completed, setCompleted] = useState<boolean>(isComplete);

    const setOutlineColor = (): string[] => {
        switch(priority) {
            case ('Low') :
                return ["green.300", "green"]
            case ('Medium') :
                return ["orange.300", 'orange']
            default :
            return ["red.600", 'red']
        }
    }
    let [outlineColor, fillColor] = setOutlineColor();

    const { data, error, isLoading, mutate } = useMutation('todos', async () => {
        const data = await deleteTodo(id);
        console.log(JSON.stringify(data, null, 2))
        return data
    })

    /**
     * Set styling of task item when box is toggled
     * TODO: Make call to API to update status of checkbox
     */
    const toggleCheckbox = (isChecked: boolean):void => {
        setCompleted(isChecked);
    }

    return (
        <Box
            className="task-item"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4} bg={completed ? 'gray.50' : ''}
        >
            <div className="task-start-content">
                <Checkbox
                    className={`checkbox-priority-${priority}`}
                    size="lg"
                    colorScheme={fillColor}
                    borderColor={outlineColor}
                    onChange={(e) => toggleCheckbox(e.target.checked)}
                />
                <Text className={completed ? 'completed-text' : ''}>{description}</Text>                
            </div>
            <GrFormTrash className='trashcan' onClick={() => mutate()} /> 
        </Box>
    );
}