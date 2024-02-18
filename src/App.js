import './App.css';
import { Route, Routes } from 'react-router-dom';
import TasksContainer from './Components/Tasks/Tasks'
import Notes from './Components/Notes/Notes';
import Settings from './Components/Settings/Settings';
import Nav from './Components/Nav/Nav';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasks } from './Redux/task-reducer';
import { useEffect } from 'react';

function App(props) {

  useEffect(() => {
    props.getTasks()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <div className='wrapper-content'>
          <Routes>
            <Route path='/Tasks' element={<TasksContainer />} />
            <Route path='/Notes' element={<Notes />} />
            <Route path='/Settings' element={<Settings />} />
          </Routes>
        </div>
      </div >
    </BrowserRouter>

  );
}



export default connect(null, {getTasks})(App);
