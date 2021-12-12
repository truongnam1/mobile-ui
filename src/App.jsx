// import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';

// import TodoItem from './components/TodoItem';
import List from './components/List';
import Contacts from './components/Contacts'


function App() {
  // var arr = [1,2,3,4,5];
  console.log('app');
  return (

    <div className="App">

      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="list">list</Link>
          </li>
          <li>
            <Link to="contact">contacts</Link>
          </li>
        </ul>
      </nav>
        <Routes>
          <Route path="list" element={<List />} />
          <Route path="contact" element={<Contacts />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
