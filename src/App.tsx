import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  // no primeiro momento nao existe usario logado, entao ele é undefined
  user: User | undefined;
  // uma função que retorna uma Promisse (sem retorno), porque usamos o async
  signInWithGoogle: () => Promise<void>;
}

// ('') - apenas o formato, no um objeto vazio
export const AuthContext = createContext({} as AuthContextType);

function App() {
  // o user nao sabe qual é o seu formato, assim passamo o <User> para resolver
  const [user, setUser] = useState<User>()

  // so vou precisar fazer login uma vez e todas as paginas teram acesso
  async function signInWithGoogle() {
    // autenticaçao do usuario 
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

    // abra o login do google como um popup
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <BrowserRouter>
    {/* tudo que esta dentro do provider vai conseguir ver o valor do contexto, no caso Home e NewRoom*/}
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rooms/new" element={<NewRoom/>}/>
          </Routes>
        </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;