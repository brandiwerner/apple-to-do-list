import { useState } from "react";
import { Heading, Spinner, useToast, Container, Text, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { TaskList } from "../../Components/TaskList/TaskList";
import { CreateTask } from "../../Components/CreateTask/CreateTask";
import { getTodos } from "../../Services/TodoService";
import { TaskItem } from "../../Components/Task/Task";

export const Completed = (): JSX.Element => {
  const toast = useToast();
  const [toastShown, setToastShown] = useState<boolean>(false);


  const { data, error, isLoading, isFetching } = useQuery("todos", async () => {
    const data = await getTodos();

    // Filter out only the completed tasks
    const completedData = data.filter((todo: TaskItem)  => todo.isComplete);

    console.log(completedData)
    return completedData;
  });

  

  const showToast = (): void => {
    toast({
      title: "Error Loading Data.",
      description: "There was an error loading the todos.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    setToastShown(true);
  };

  const renderData = ():JSX.Element | null => {
    if (data) {
      if (Array.isArray(data) && data.length > 0) {
        return <TaskList tasks={data} /> 
      } 
    }
      
    if (isLoading) {
      return null
    } else {
      return <Text m={3}>No task to display.</Text>
    }
  }

  return (
    <>

      {error && !toastShown && showToast()}
      <Heading as="h1">Completed Tasks</Heading>

      {isLoading && (
        <div className="spinner-container">
          <Spinner
            size="lg"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </div>
      )}
      <Container maxW="container.md">
        {renderData()}
      </Container>
      <CreateTask />
    </>
  );
};
