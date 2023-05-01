import React, { useContext, useState, useEffect }  from 'react'
import { Form, Button } from 'semantic-ui-react'
import "./EjecComando.scss"

import { SocketContext } from '../../../context/SocketContext';

export default function EjecComando() {

  const [valor, setValor] = useState('');
  const {socket} = useContext(SocketContext);
  const [estado, setEstado] = useState('');

  useEffect(() => {
    socket.on('inicio', (data) => {
        // console.log(bands);
        setEstado( data );
    })

    // off para dejar de escuchar el evento
    return () => socket.off('inicio')

  }, [ socket ])

  useEffect(() => {
    socket.on('fin', (data) => {
        // console.log(bands);
        setEstado( data );
    })

    // off para dejar de escuchar el evento
    return () => socket.off('fin')

  }, [ socket ])

  const OnSubmit = (ev) => { 
    ev.preventDefault();
    console.log(valor)
    if (valor.trim().length > 0 ) {
      socket.emit('comando', valor);
      setValor('');
    }

    
  }

  return (
    <Form onSubmit={OnSubmit} className="ejecComando-form">
        <Form.Input placeholder="Seleccione Comando" value={valor} onChange={ (ev)=>setValor(ev.target.value)}  name="sComando"></Form.Input>
        
        <Button type="submit" className='btn-submit'>Ejecutar Comando</Button>
        <p className="aviso">{estado}</p>
    </Form>
  )
}
