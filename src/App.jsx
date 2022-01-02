// import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
import 'animate.css';
import routes from './pages/routes';


function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route
          path="/mobile-ui"
          element={<Navigate to="/" />}
        />
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
