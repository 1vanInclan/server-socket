import React, { useContext } from 'react'
import {Container, Grid, Image}from "semantic-ui-react"
import { Link}from "react-router-dom"
import "./Header.scss"
import RightHeader from './RightHeader'
 
import Logounam from "../../assets/images/logo_unam_svg.svg";
import { SocketContext } from '../../context/SocketContext'

export default function Header() {

  const {online} = useContext(SocketContext);


  return (
    <div className='header'>
        <Container>
            <Grid>
                <Grid.Column width={3} className="header__logo">
                
                <Link to="/">
                <Image src={Logounam} alt="La Universidad de la Nación" className='logo_unam' />
                </Link>
                </Grid.Column>
                <Grid.Column width={10}>
                <div class="text-center">
                     <span className='p1'>RED ACADÉMICA DE PRODUCCIÓN</span>
                      <span className='p2'>DE CONTENIDOS 3D PARA</span>
                      <span className='p3'>LA EDUCACIÓN</span>
                 </div>
                </Grid.Column>

                <Grid.Column>
                    <RightHeader></RightHeader>
                </Grid.Column>
            </Grid>
            <div>
              <p>
                Estado del servicio:
                {
                  online
                  ? <span> online</span>
                  : <span> offline</span>

                }
              </p>
            </div>
        </Container>
    </div>
  
  )
}


