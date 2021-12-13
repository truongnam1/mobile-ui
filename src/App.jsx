// import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import './App.css';

import routes from './pages/routes';


function App() {
  // var arr = [1,2,3,4,5];
  console.log('app');
  return (
      <BrowserRouter>
        <Routes>
          {
             routes.map(({path, element},index) => {
              return (
                <Route path={path} element={element} key={index}/>
            )})
          }
        </Routes>
      </BrowserRouter>
  );
}

export default App;
