import React, { useState } from 'react';
import { Container, Image } from "semantic-ui-react";
import unamFirma from "../../assets/images/unam-firma-azul.png";
import Logounam from "../../assets/images/logo_unam_svg.svg";
import espacio from "../../assets/images/3d.png";
// Importar el componente RegisterForm
import RegisterForm from '../../components/Auth/RegisterForm';
// Importacion del estilo flip
import ReactCardFlip from 'react-card-flip';
// Importamos el componente LoginForm
import LoginForm from '../../components/Auth/LoginForm';
// Importar sass
import "./Auth.scss";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <Container fluid className='auth'>
            {/* Header */}
            <nav class="navbar">
                <div class="logo_izq">
                    <Image src={unamFirma} alt="La Universidad de la Nación" className='logo_unam' />
                </div>
                <div class="text-center">
                    <Image src={Logounam} alt="La Universidad de la Nación" className='logo_unam' />
                    <p class="title"></p>
                    <span class="subtitle"></span>
                </div>
                <div class="imagen">
                    <Image src={espacio} className='rounded-circle img-emotiva' />
                </div>
            </nav>
            <div className='text-welcome'>
                <h2>Bienvenid@</h2>
            </div>
            {/* Formulario */}
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className='form'>
                    <div className='container-form'>
                        <LoginForm />
                    </div>
                    <div className='change-form'>
                        <>
                            ¿No tienes cuenta?
                            <span onClick={() => setIsFlipped((prev) => !prev)}>Registrate</span>
                        </>
                    </div>
                </div>

                <div className='form'>
                    <div className='container-form' onClick={() => setIsFlipped((prev) => prev)}>
                        <RegisterForm setShowLogin={setShowLogin} />
                    </div>
                    <div className='change-form'>
                        <>
                            Entra con tu cuenta
                            <span onClick={() => {
                                setIsFlipped((prev) => !prev);
                                setShowLogin(!showLogin);
                            }}>Inicia Sesión</span>
                        </>
                    </div>
                </div>
            </ReactCardFlip>
        </Container>

    );
}
