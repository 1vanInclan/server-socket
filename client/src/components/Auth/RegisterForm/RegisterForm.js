import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
// Importamos la dependencia Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Importacion de toastify
import { toast } from "react-toastify"
// importacion de apollo client para uso de mutation
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user"
import "./RegisterForm.scss";


export default function RegisterForm(props) {
    // console.log(props);
    const { setShowLogin } = props;
    // Obtencion del mutation
    const [register] = useMutation(REGISTER);

    // Uso de formik
    const formik = useFormik({
        // Indicar valores iniciales de los inputs
        initialValues: initialValue(),
        // Uso de dependencia YUP para validacion en el formulario
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().matches(/^[a-zA-Z0-9_-]*$/, "El nombre del usuario no puede tener espacios").required("El nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            // oneof para hacer una comparacion con otro elemento
            // password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseña no coinciden"),
            password: Yup.string().required("La contraseña es obligatoria"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
            acceptTerms: Yup.bool().required("Es obligatorio").oneOf([true], 'Accept Terms & Conditions is required'),

        }),
        // Obtiene los datos del formulario con onsubmit
        onSubmit: async(formData, {resetForm}) => {
            try{
                const newUser = formData;
                console.log(newUser);
                // Eliminar contraseña repetida para el servidor
                delete newUser.repeatPassword;
                delete newUser.acceptTerms;

                await register({
                    // Obtiene las variables de newUser
                    variables: {
                        input: newUser
                    },
                });
                toast.success("Usuario registrado correctamente");
                resetForm({ formData: initialValue()});
                setShowLogin(true);
            }catch (error){
                toast.error(error.message);
                console.log(error);
            }
        }
    });

    return (
        <>
            <h2 className="register-form-title">Registrate para unirte a esta comunidad</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                type="text" 
                placeholder="Nombre y apellidos"
                value={formik.values.name}
                name="name" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                />
                <Form.Input 
                type="text" 
                placeholder="Nombre de usuario"
                value={formik.values.username}
                name="username" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                error={formik.touched.username && formik.errors.username}
                />
                <Form.Input 
                type="text" 
                placeholder="Correo electronico"
                value={formik.values.email} 
                name="email" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                />
                <Form.Input
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                />
                <Form.Input 
                type="password"
                placeholder="Repetir contraseña"
                value={formik.values.repeatPassword}
                name="repeatPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                />
                <Form.Input
                type="checkbox" 
                label="Aceptar 'Terminos y condiciones'"
                checked={formik.values.acceptTerms} 
                name="acceptTerms" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.acceptTerms && formik.errors.acceptTerms}
                className="checked"
                />
                
                <Button primary type="submit" className="btn-submit">Registrarse</Button>
            </Form>
        </>
    )
}


// Funcion para initial values usados por formik

function initialValue() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        acceptTerms: false
    };
}