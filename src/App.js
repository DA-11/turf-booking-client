
import {Route,Routes} from 'react-router-dom';
import {UserContextProvider} from "./UserContext";
import LayoutPage from "./Components/LayoutPage";
import IndexPage from './Components/Index/IndexPage';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import axios from "axios"
import Profile from './Components/Profile/Profile';
import FindGame from './Components/FindGame/FindGame';
import HostGame from './Components/HostGame/HostGame';
import TurfUpload from './Components/TurfUpload/TurfUpload';
import TurfInfo from './Components/TurfInfo/TurfInfo';
import GameDetails from './Components/GameDetails/gameDetails';
import TurfShowCase from './Components/TurfShowCase/TurfShowCase';


axios.defaults.baseURL = 'http://127.0.0.1:5003';
axios.defaults.withCredentials = true;


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/findGame' element={<FindGame/>}></Route>
          <Route path='/hostGame' element={<HostGame/>}></Route>
          <Route path='/turfUpload' element={<TurfUpload/>}></Route>
          <Route path='/turfInfo/:id' element={<TurfInfo/>}></Route>
          <Route path='/turfShowCase' element={<TurfShowCase/>}></Route>
          <Route path='/gameDetails' element={<GameDetails/>}></Route>
        </Route>
        <Route path='/login' element={<LoginRegister/>}></Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
