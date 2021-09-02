import { Task, TaskItem } from "../../Components/Task/Task";

interface TaskListProps {
  tasks: TaskItem[];
}

export const TaskList = ({ tasks }: TaskListProps): JSX.Element => {
  const renderTasks = (): JSX.Element => {
    return (
      <>
        {tasks.map((task, index) => (
          <Task
            key={`${task.id}-${index}`}
            description={task.description}
            isComplete={task.isComplete}
            priority={task.priority}
            dueDate={task.dueDate}
            id={task.id}
          />
        ))}
      </>
    );
  };

  return <>{renderTasks()}</>;
};
