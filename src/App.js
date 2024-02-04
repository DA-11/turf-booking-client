
import {Route,Routes} from 'react-router-dom';
import {UserContextProvider} from "./UserContext";
import LayoutPage from "./Components/LayoutPage";
import IndexPage from './Components/IndexPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}></Route>
        </Route>

      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
