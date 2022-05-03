// useEffect - disparar uma funcao sempre que algo acontecer
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

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

type AuthContextProvierProps = {
    // sempre que enviamos um componente do react como children, usamos o ReacNode como tipagem
    children: ReactNode;
}

// ('') - apenas o formato, no um objeto vazio
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvier(props: AuthContextProvierProps) {
    // o user nao sabe qual é o seu formato, assim passamo o <User> para resolver
    const [user, setUser] = useState<User>()


    // toda vez que usarmos o event listener (onAuthStateChanged) voce precisa se descadastrar desse evento, usando o return 
    useEffect(() => {
        // monitora ver se exercicio um login pre feito pelo usario, se tiver ele preenche os dados
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

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
        // {/* tudo que esta dentro do provider vai conseguir ver o valor do contexto, no caso Home e NewRoom*/}
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}