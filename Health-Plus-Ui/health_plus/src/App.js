import './App.css';

import {BrowserRouter} from "react-router-dom"
import Routing from './Routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <BrowserRouter>
      <div>

        <Routing />
        
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
