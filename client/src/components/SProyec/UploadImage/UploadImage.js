import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import "./UploadImage.scss"

export default function UploadImage() {
  return (
    <Form className="uploadImage-form">
        <Form.Input placeholder="Nombre del archivo" name="nArchivo"></Form.Input>
        <Form.Input placeholder="Fotogramas deseados" name="nFotogramas"></Form.Input>
        <Button type="submit" className='btn-submit'>Guardar comando</Button>
    </Form>
  )
}
