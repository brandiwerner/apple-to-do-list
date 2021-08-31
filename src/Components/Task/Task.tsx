import React, { useState } from 'react';
import { GrFormTrash } from 'react-icons/gr';
import { Box, Checkbox, Text } from '@chakra-ui/react';

import './Task.scss';

enum Priority{
    Low = 1,
    Medium,
    High
};

export interface TaskItem {
    text: string,
    isComplete: boolean,
    priority: Priority
};

export const Task = (props: TaskItem):JSX.Element => {
    const { text, isComplete, priority } = props;

    // TODO: Determine if isCompleted via database
    const [completed, setCompleted] = useState<boolean>(isComplete);

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
                    colorScheme="cyan"
                    onChange={(e) => toggleCheckbox(e.target.checked)}
                />
                <Text className={completed ? 'completed-text' : ''}>{text}</Text>                
            </div>
            <GrFormTrash className='trashcan'/> 
        </Box>
    );
}