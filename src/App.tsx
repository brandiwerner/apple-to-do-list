import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"

import './App.scss';

import { AllTasks } from './Pages/AllTasks/AllTasks';
import { Calendar } from './Pages/Calendar/Calendar';
import { Completed } from './Pages/Completed/Completed';
import { WeeklyTasks } from './Pages/WeeklyTasks/WeeklyTasks';
import { NewTask } from "./Pages/NewTask/NewTask";
import { Menu } from './Components/Menu/Menu';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Menu/>
          <Switch>
            <Route path='/' exact > <WeeklyTasks /> </Route>
            <Route path='/Weekly' exact > <WeeklyTasks /> </Route>
            <Route path='/AllTasks' exact > <AllTasks /> </Route>
            <Route path='/Calendar' exact > <Calendar /> </Route>
            <Route path='/Completed' exact > <Completed /> </Route>
            <Route path='/NewTask' exact > <NewTask /> </Route>
            <Route path='/EditTask/:id' exact > <div>Need to implement Edit Task</div> </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
