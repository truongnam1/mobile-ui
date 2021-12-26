// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';

import routes from './pages/routes';
import { BaseProvider } from './Provider/BaseContext';


function App() {
  // var arr = [1,2,3,4,5];
  return (
    <BaseProvider>
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
    </BaseProvider>
  );
}

export default App;
