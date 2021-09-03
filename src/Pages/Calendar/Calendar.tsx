import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import DatePicker from "react-datepicker";
import { useToast } from '@chakra-ui/toast';
import { Container, Spinner, Text, Heading } from '@chakra-ui/react';

import { getTodos } from '../../Services/TodoService';
import { CreateTask } from "../../Components/CreateTask/CreateTask";
import { TaskList } from '../../Components/TaskList/TaskList';
import { TaskItem } from '../../Components/Task/Task';

import "./Calendar.scss";

export const Calendar = (): JSX.Element => {
  const toast = useToast();
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateTodos, setSelectedDateTodos] = useState<TaskItem[]>([]);
  const [daysWithTodosInMonth, setDaysWithTodosInMonth] = useState<number[]>([]);
  const [monthShown, setMonthShown] = useState<number>(new Date().getMonth());
  
  /**
   * Retrieve all todos from the api
   */
  const { data, error, isLoading } = useQuery("todos", async () => {
    const data = await getTodos();
    return data;
  });

  /**
   * Get the todos for the date selected and add a class name to the dates which have task on them
   */
  useEffect(() => {
    const month = selectedDate.getUTCMonth();
    const day = selectedDate.toDateString().split(' ')[2];
    const year = selectedDate.getUTCFullYear();
    if (data) {
      let todoDate;
      const dateList = data.filter((todo: TaskItem)  => {
        todoDate = new Date(todo.dueDate);
        return (day === todoDate.toDateString().split(' ')[2] && month === todoDate.getUTCMonth() && year === todoDate.getUTCFullYear());
      })

      setSelectedDateTodos(dateList);
    }

    // Add the task-day class to the days in the month that have tasks
    // We need to do this because the date picker changes the classes as dates are selected and deselected
    if (daysWithTodosInMonth) {
      let calendarDay;
      let day = '';
      daysWithTodosInMonth.forEach((date) => {
        day = date > 9 ? `0${date}` : `00${date}`;
        calendarDay = document.querySelector(`.react-datepicker__day--${day}:not(.react-datepicker__day--outside-month`);
        calendarDay?.classList.add('task-day');
      })
    }
  }, [selectedDate, daysWithTodosInMonth, data]);

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

  /**
   * Add symbol to calendar date to show which dates have todos due on them
   */
  useEffect(() => {
    if (data) {
      const calendarDays = document.querySelectorAll('.react-datepicker__day:not(.react-datepicker__day--outside-month');

      let todoDate;
      const taskDayList = data.filter((todo: TaskItem) => {
        todoDate = new Date(todo.dueDate);
        if (todoDate.getMonth() === monthShown) {
          calendarDays[todoDate.getDate() - 1].classList.add('task-day');
          return true;
        }
        return false;
      }).map((todo:TaskItem) => {
        todoDate = new Date(todo.dueDate);
        return todoDate.getDate();
      });     

      setDaysWithTodosInMonth(taskDayList);
    }
  }, [monthShown, data])

  return (
    <>
      {error && !toastShown && showToast()}
      <Heading as="h1" mb={3}>Task Calendar</Heading>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner
            size="lg"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </div>
      ) : (
        <>
          <Container maxW="container.sm">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                date = Array.isArray(date) ? date[0] : date;
                if (date) {
                  setSelectedDate(date);
                }
              }}
              onMonthChange={date => setMonthShown(date.getMonth())}
              wrapperClassName="date-picker-container"
              inline
            />       
          </Container>

          <Container maxW="container.md">
            {selectedDateTodos.length > 0 ? <TaskList tasks={selectedDateTodos} /> : <Text m={3}>Yay, you have no tasks for this day.</Text> }   
          </Container>
        </>
      )
    }
      <CreateTask />
    </>
  );
};
 