import { useEffect, useState } from "react"
import { database } from "../services/firebase";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

// record- declarar tipagem de um objeto
// a chave é uma string e o valor é outro objeto {}
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>;

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    // dispara um evento sempre que uma informação mudar
    // quando colocamos o array vazio ([]) a função vai disparar apenas uma vez assim que o componente for exibido em tela
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        // event listenner
        // on - vai ficar ouvindo toda vez que a sala receber uma nova question, ou mudar algo, e passar para a tela.
        roomRef.on('value', room => {
            const databaseRoom = room.val()
            
            // informar o type 
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            // transforma objeto em array, com chave e valor, tipo uma matriz
            // .map(([key, value]) - desestruturação
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId]);

    return { questions, title }
}