import React, { useCallback, useEffect, useState } from 'react';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformedTasks = useCallback((tasks) => {
    let loadedTasks = [];

    for (const taskKey in tasks) {
      loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-http-179bf-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      },
      transformedTasks
    );
  }, [fetchTasks, transformedTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
