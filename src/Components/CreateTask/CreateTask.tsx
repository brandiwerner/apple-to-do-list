import { useHistory } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { Button } from "@chakra-ui/react";

import "./CreateTask.scss";

export const CreateTask = (): JSX.Element => {
  const history = useHistory();

  return (
    <Button
      className="create-task-button"
      onClick={() => history.push("/NewTask")}
    >
      <GrAdd />
    </Button>
  );
};
