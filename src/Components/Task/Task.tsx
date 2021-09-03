import { useState } from "react";
import { GrFormTrash } from "react-icons/gr";
import { Box, Checkbox, Text, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { deleteTodo, updateTodo } from "../../Services/TodoService";

import "./Task.scss";

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface TaskItem {
  description: string;
  isComplete: boolean;
  priority: Priority;
  id: string;
  dueDate: string;
}

export const Task = (props: TaskItem): JSX.Element => {
  const { id, description, isComplete, priority, dueDate } = props;
  const queryClient = useQueryClient();
  const date = new Date(dueDate);
  const displayDate = date.toDateString();

  const toast = useToast();
  const [completeToastShown, setCompleteToastShown] = useState<boolean>(false);
  const [deleteToastShown, setDeleteToastShown] = useState<boolean>(false);

  const setOutlineColor = (): string[] => {
    switch (priority) {
      case "Low":
        return ["green.300", "green"];
      case "Medium":
        return ["orange.300", "orange"];
      default:
        return ["red.600", "red"];
    }
  };
  let [outlineColor, fillColor] = setOutlineColor();

  const showCompleteToast = (): void => {
    toast({
      title: "Error Marking Complete.",
      description: "There was an error completing this todo.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    setCompleteToastShown(true);
  };

  const showDeleteToast = (): void => {
    toast({
      title: "Error Deleting.",
      description: "There was an error deleting the todo.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    setDeleteToastShown(true);
  };

  /**
   * Make API call to delete task
   */
  const {
    error: deleteError,
    isLoading: deleteIsLoading,
    mutate: deleteMutate,
  } = useMutation(
    "todos",
    async () => {
      const data = await deleteTodo(id);
      console.log(JSON.stringify(data, null, 2));
      return data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );

  /**
   * Make API call to update complete status of task
   */
  const {
    error: completeError,
    isLoading: completeIsLoading,
    mutate: completeMutate,
  } = useMutation(
    "todos",
    async (isComplete: boolean) => {
      const data = await updateTodo({ id, isComplete: isComplete });
      console.log(JSON.stringify(data, null, 2));
      return data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <>
      {completeError && !completeToastShown && showCompleteToast()}
      {deleteError && !deleteToastShown && showDeleteToast()}
      <Box
        className="task-item"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg={isComplete ? "gray.50" : ""}
      >
        <div className="task-start-content">
          <Checkbox
            className={`checkbox-priority-${priority} task-checkbox`}
            size="lg"
            colorScheme={fillColor}
            borderColor={outlineColor}
            defaultIsChecked={isComplete}
            onChange={(e) => {
              // toggleCheckbox(e.target.checked);
              completeMutate(!isComplete);
            }}
            m={1}
            mr={3}
          />
          <div className='task-text-container'>
            <Text className={isComplete ? "completed-text" : ""} align='left'>
              {description}
            </Text>
            <Text className={isComplete ? "completed-text" : ""} fontSize="xs" align='left'>
              {displayDate}
            </Text>
          </div>
        </div>
        <GrFormTrash className="trashcan" onClick={() => deleteMutate()} />
      </Box>
    </>
  );
};
