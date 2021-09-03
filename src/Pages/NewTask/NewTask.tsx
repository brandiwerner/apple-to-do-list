import { useState } from "react";
import {
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useMutation } from "react-query";

import { createTodo } from "../../Services/TodoService";
import { Priority } from "../../Components/Task/Task";

import "react-datepicker/dist/react-datepicker.css";
import "./NewTask.scss";
import { useHistory } from "react-router-dom";

interface FormData {
  description: string;
  priority: Priority;
  dueDate: Date;
}

export const NewTask = (): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    mode: "onChange"
  });
  const [error, setError] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>("low");

  const history = useHistory();
  const toast = useToast();

  const formFields = {
    priority: register("priority", { required: true }),
  };

  const [toastShown, setToastShown] = useState<boolean>(false);
  const showToast = (): void => {
    toast({
      title: "Error Submitting.",
      description: "There was an error sumbitting your request.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    setToastShown(true);
  };

  /**
   * Handler for submitting new task.
   * @param data New task data
   * @returns
   */
  const onSubmit = (data: any) => mutate(data);

  /**
   * Make API call to create a new task
   */
  const { isLoading, mutate } = useMutation(
    "todos",
    async (newTodoData: FormData) => {
      const data = await createTodo({
        description: newTodoData.description,
        priority: newTodoData.priority,
        dueDate: newTodoData.dueDate,
      }).catch(() => {
        setError(true);
      });

      if (data) {
        history.goBack();
      }
      return data;
    }
  );

  return (
    <>
      {error && !toastShown && showToast()}
      <Heading as="h1" className="top-heading">
        New Task
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="new-task">
        <div className="new-task-content">
          <div className="form-item">
            <Heading as="label" id="description" size="md">
              Description
            </Heading>
            <Input
              {...register("description", { required: true })}
              aria-label="description"
            />
            <Text className="form-error">
              {errors.description && "Description is required"}
            </Text>
          </div>

          <div className="form-item">
            <Heading as="h2" id="priority" size="md">
              Priority
            </Heading>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Stack spacing={10} direction="row" aria-label="priority">
                <Radio
                  {...formFields.priority}
                  value="High"
                  size="lg"
                  borderColor="red.600"
                  colorScheme="red"
                >
                  High
                </Radio>
                <Radio
                  {...formFields.priority}
                  value="Medium"
                  size="lg"
                  borderColor="orange.300"
                  colorScheme="orange"
                >
                  Medium
                </Radio>
                <Radio
                  {...formFields.priority}
                  value="Low"
                  size="lg"
                  borderColor="green.300"
                  colorScheme="green"
                >
                  Low
                </Radio>
              </Stack>
            </RadioGroup>
            <Text className="form-error">
              {errors.priority && "Priority is required"}
            </Text>
          </div>

          <div className="form-item">
            <Heading as="h2" id="dueDate" size="md">
              Due Date
            </Heading>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            <Text className="form-error">
              {errors.dueDate && "Due Date is required"}
            </Text>
          </div>

          <div className="spinner-container">
            {isLoading && (
              <Spinner
                size="lg"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
              />
            )}
          </div>
        </div>
        <div className="form-submit-container">
          <input type="submit" className={`form-submit ${isValid ? 'submit-enabled' : 'submit-disabled'}`} disabled={!isValid}/>
        </div>
      </form>
    </>
  );
};
