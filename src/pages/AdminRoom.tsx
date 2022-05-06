import '../styles/room.scss';
import { useNavigate, useParams } from 'react-router-dom';

import deleteImg from '../assets/images/delete.svg'

import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
// import { useAuth } from '../hooks/useAuth';

type RoomParms = {
    id: string;
}


export function AdminRoom() {
    // const { user } = useAuth();
    // parametro para a tipagem
    const params = useParams<RoomParms>();
    const roomId = params.id;

    const navigate = useNavigate()

    const { title, questions } = useRoom(roomId!)

    // Função para encerrar sala
    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        // Depois de encerrar a sala o user é enviado para a pagina Home
        navigate('/')
    }

    async function handleCheckQuestionAsAnswerd(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo imagem" />
                    <div>
                        <RoomCode code={roomId!} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {/* percorre o question e retornar um componente novo para cada um deles */}
                    {questions.map(question => {
                        return (
                            <Question
                                // precisamos para a key para o react conseguir identificar uma pergunta da outra
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    // react obriga a colocar essa div por volta, se nao da erro
                                    // tiramos o termo div e deixamos so fragmento, assim ele nao interfe no CSS e tambem nao aparece no devtools
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswerd(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}