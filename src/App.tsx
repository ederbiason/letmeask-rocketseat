import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvier } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
        <AuthContextProvier>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
            <Route path="/rooms/:id" element={<Room/>}/>
          </Routes>
        </AuthContextProvier>
    </BrowserRouter>
  );
}

export default App;