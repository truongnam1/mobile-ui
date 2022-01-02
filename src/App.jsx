// import logo from './logo.svg';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
// import './App.css';
import 'animate.css';
import routes from './pages/routes';


function App() {
  return (
      // <BrowserRouter>
      //   <Routes>
      //     {
      //       routes.map(({ path, element }, index) => {
      //         return (
      //           <Route path={path} element={element} key={index} />
      //         )
      //       })
      //     }
      //   </Routes>
      // </BrowserRouter>


<HashRouter>
<Routes>
  {
    routes.map(({ path, element }, index) => {
      return (
        <Route path={path} element={element} key={index} />
      )
    })
  }
</Routes>
</HashRouter>



  );
}

export default App;
