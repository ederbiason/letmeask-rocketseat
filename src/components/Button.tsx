// Criamos este arquivo pois o mesmo estilo de botão aparece em várias partes do projeto

// ButtonHTMLAttributes - tipagem do typescript, mostra todas as props que a tag button pode receber
// <HTMLButtonElement> elemento global do button
import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

export function Button({
    // tudo que nao for isOutlined, vai para o ...props - (rest operator)
    isOutlined = false, ...props
}: ButtonProps) {
    return (
        // {...props} distribui todas as propriedades para o button
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
    )
}