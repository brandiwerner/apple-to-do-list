import { useState } from 'react';
import { Heading, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useMutation } from 'react-query';

import "react-datepicker/dist/react-datepicker.css";
import './NewTask.scss';

interface FormData {
  description: string;
  priority: [];
  dueDate: string;
}

export const NewTask = (): JSX.Element => {
  const { control, register, handleSubmit, formState: { errors }, } = useForm<FormData>();
  const [radioValue, setRadioValue] = useState<string>('low');
  const onSubmit = (data: any) => console.log(data);

  const formFields = {
    priority: register("priority", { required: true })
  }

  const { data, error, isLoading, mutate } = useMutation('todos', async () => {
    const data = await deleteTodo(id);
    console.log(JSON.stringify(data, null, 2))
    return data
  })

  return (
    <>
      <Heading as='h1'>New Task</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className='new-task'>
        <div className='new-task-content'>
          <div className='form-item'>
            <Heading as='label' id='description' size="md">Description</Heading>
            <Input  {...register("description", { required: true, maxLength: 20 })} aria-label='description' />
            <Text className='form-error'>{errors.description && "Description is required"}</Text>
          </div>

          <div className='form-item'>
            <Heading as='h2' id="priority" size="md">Priority</Heading>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Stack spacing={10} direction="row" aria-label="priority">
                <Radio {...formFields.priority} value="high" size="lg" borderColor="red.600" colorScheme="red">High</Radio>
                <Radio {...formFields.priority} value="medium" size="lg" borderColor="orange.300" colorScheme="orange">Medium</Radio>
                <Radio {...formFields.priority} value="low" size="lg" borderColor="green.300" defaultIsChecked colorScheme="green">Low</Radio>
              </Stack>
            </RadioGroup>
            <Text className='form-error'>{errors.priority && "Priority is required"}</Text>
          </div>

          <div className='form-item'>
            <Heading as='h2' id='dueDate' size="md">Due Date</Heading>
            <Controller
              control={control}
              rules={{
                required: true,
               }}
              name='dueDate'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select date'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value as any}
                />
              )}
            />
            {/* <DatePicker
              {...register("dueDate", { required: true })}
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              aria-label='dueDate'
            /> */}
            <Text className='form-error'>{errors.dueDate && "Due Date is required"}</Text>
          </div>


        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}