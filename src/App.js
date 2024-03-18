
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
import HostedGames from './Components/Profile/HostedGames';
import RequestedGames from './Components/Profile/RequestedGames';
import ChatPage from './Components/Chat/ChatPage';
import socketIO from 'socket.io-client';
import ChatBar from './Components/Chat/ChatBar';

const socket = socketIO.connect('http://localhost:4100')
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
          <Route path='/hostGame/:turf_id' element={<HostGame/>}></Route>
          <Route path='/turfUpload' element={<TurfUpload/>}></Route>
          <Route path='/turfInfo/:id' element={<TurfInfo/>}></Route>
          <Route path='/turfShowCase' element={<TurfShowCase/>}></Route>
          <Route path='/gameDetails' element={<GameDetails/>}></Route>
          <Route path='/hostedGames' element={<HostedGames/>}></Route>
          <Route path='/requestedGames' element={<RequestedGames/>}></Route>
          <Route path='/chats' element={<ChatBar></ChatBar>}></Route>
          <Route path='/chat/:friendUserName' element={<ChatPage socket={socket}/>}></Route>
        </Route>
        <Route path='/login' element={<LoginRegister/>}></Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
