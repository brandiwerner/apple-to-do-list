import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import { AllTasks } from './Pages/AllTasks/AllTasks';
import { Calendar } from './Pages/Calendar/Calendar';
import { Completed } from './Pages/Completed/Completed';
import { NewTask } from "./Pages/NewTask/NewTask";
import { Menu } from './Components/Menu/Menu';
import { useIsFetching } from "react-query";
import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

function App() {

  const isFetching = useIsFetching()

  return (
        <div className="App">
          <BrowserRouter>
            <Menu />
            {isFetching > 0 ? (
              <Box position="fixed" top="3" right="3">
                <Spinner size="xs" />
              </Box>
            ) : null}
            <Switch>
              <Route path='/' exact > <AllTasks /> </Route>
              <Route path='/AllTasks' exact > <AllTasks /> </Route>
              <Route path='/Calendar' exact > <Calendar /> </Route>
              <Route path='/Completed' exact > <Completed /> </Route>
              <Route path='/NewTask' exact > <NewTask /> </Route>
              <Route path='/EditTask/:id' exact > <div>Need to implement Edit Task</div> </Route>
            </Switch>
          </BrowserRouter>
        </div>
  );
}

export default App;
