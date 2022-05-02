// Criamos este arquivo pois o mesmo estilo de botão aparece em várias partes do projeto

// ButtonHTMLAttributes - tipagem do typescript, mostra todas as props que a tag button pode receber
// <HTMLButtonElement> elemento global do button
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        // {...props} distribui todas as propriedades para o button
        <button className="button" {...props}/>
    )
}