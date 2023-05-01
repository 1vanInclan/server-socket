import React, { useState } from 'react'
// Importacion de semantic
import { Form, Button } from "semantic-ui-react"
// Importamos formik para la obtencion de datos
import { useFormik } from "formik"
// Importamos Yup para la validacion de datos
import * as Yup from "yup";
// Importamos apolloclient para el uso de la mutacion 
import { useMutation } from '@apollo/client';
// Importamos mutacion login
import { LOGIN } from "../../../gql/user";
// Importacion de token
import { setToken, decodeToken } from "../../../utils/token";
// Importacion de hook
import useAuth from '../../../hooks/useAuth';
import "./LoginForm.scss"


export default function LoginForm() {

    const [error, setError] = useState("")
    // Extraemos el mutation
    const [login] = useMutation(LOGIN)

    const { setUser } = useAuth();


    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formData) => {
            setError("");
            try {
                const { data } = await login({
                    variables: {
                        input: formData
                    }
                });
                const { token } = data.login;
                // Guardar token en localstorage
                setToken(token);
                // Decodifica el token y lo pasa a setUser
                setUser(decodeToken(token));
                console.log(token);
            } catch (error) {
                setError(error.message);
            }
        },
    });
    return (
        <Form className='login-form' onSubmit={formik.handleSubmit}>
            <h2>Inicia Sesión</h2>
            <Form.Input
                type='text'
                placeholder="Correo Electronico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
            />
            <Form.Input
                type='password'
                placeholder="Contraseña"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
            />
            <Button primary type="submit" className='btn-submit'>Iniciar Sesión</Button>
            {error && <p className="submit-error">{error}</p>}
        </Form>
    )
}

function initialValue() {
    return {
        email: "",
        password: "",
    }
}