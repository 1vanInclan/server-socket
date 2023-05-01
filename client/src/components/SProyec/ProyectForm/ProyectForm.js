import React, {useCallback} from 'react';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import {useDropzone} from "react-dropzone"
import "./ProyectForm.scss";


export default function ProyectForm(props) {

  const {setShowModal}=props

 

    const onDrop = useCallback((acceptedFile)=>{
        const file =acceptedFile[0];
        console.log(file);
    },[]);

    const {getRootProps, getInputProps}= useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard:true,
        multiple:false,
        onDrop,
    })

  return (
    <div className='proyect-form'>
        <div {...getRootProps()} className="dropzone">
            <Icon name="cloud upload"></Icon>
            <p>Arrastra el archivo...</p>
        <input {...getInputProps()}></input> 

        </div>
         {/* <Button {...getRootProps()}>Seleccionar proyecto</Button> */}
  
        <Button onClick={()=>setShowModal(false)}>Cancerlar</Button>
        <Button type="submit" className='btn-submit'>Subir Proyecto</Button>
        {/* <input {...getInputProps()}></input> */}
      
        </div>
  )
}
