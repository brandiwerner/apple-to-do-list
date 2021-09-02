import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import { ChakraProvider } from "@chakra-ui/react"

import './App.scss';

import { AllTasks } from './Pages/AllTasks/AllTasks';
import { Calendar } from './Pages/Calendar/Calendar';
import { Completed } from './Pages/Completed/Completed';
import { NewTask } from "./Pages/NewTask/NewTask";
import { Menu } from './Components/Menu/Menu';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <BrowserRouter>
            <Menu />
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
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
