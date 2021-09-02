import { useState } from "react";
import { Heading, Spinner, useToast, Container  } from "@chakra-ui/react";
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
    return data;
  });

  const showToast = (): void => {
    toast({
      title: "Error Loading.",
      description: "There was an error loading the todos.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    setToastShown(true);
  };

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
        {data ? <TaskList tasks={data} /> : null}   
      </Container>
      

      <CreateTask />
    </>
  );
};
