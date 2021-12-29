// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';

import routes from './pages/routes';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {
            routes.map(({ path, element }, index) => {
              return (
                <Route path={path} element={element} key={index} />
              )
            })
          }
        </Routes>
      </BrowserRouter>
  );
}

export default App;
