import { useState } from "react";
import { Heading, Spinner, useToast, Container, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { TaskList } from "../../Components/TaskList/TaskList";
import { CreateTask } from "../../Components/CreateTask/CreateTask";
import { getTodos } from "../../Services/TodoService";

import "./AllTasks.scss";

export const AllTasks = (): JSX.Element => {
  const toast = useToast();
  const [toastShown, setToastShown] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery("todos", async () => {
    const data = await getTodos();
    console.log(data)
    return data;
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
      <Heading as="h1">All Tasks</Heading>

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
