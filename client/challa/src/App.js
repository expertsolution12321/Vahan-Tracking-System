

// import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './component/signIn';
import SignUp from './component/signup';
function App() {
  return (
   
   <>
   <Router>
    <Routes>
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signUp' element={<SignUp/>} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
