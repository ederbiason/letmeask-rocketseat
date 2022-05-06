// ReactNode é qualquer coisa que é aceitavel 
import { ReactNode } from 'react';

// ajuda a nao ter que ficar fazendo um monte de if ternario
// `question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}` como esse
import cx from 'classnames';

import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

// desustruturamos para usar somente o que queremos do objeto
export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
}: QuestionProps) {
    return (
        <div className={cx(
                'question',
                { answered: isAnswered },
                { highlighted: isHighlighted && !isAnswered } 
            
            )}
        >
            <p>
                {content}
            </p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}