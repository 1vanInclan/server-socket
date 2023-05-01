import React, { useState, useEffect, useMemo } from 'react';
// Para utilizar componentes de semantic
// import { Button } from "semantic-ui-react";
// Para utilizar apollo
import { ApolloProvider} from "@apollo/client";
// Importacion de toast
import { ToastContainer } from "react-toastify"
import client from "./config/apollo"
// importar auth por medio de index de carpeta pages
import Auth from './pages/Auth';
// Importamos funcion para obtener token de localstorage
import { getToken } from './utils/token';
// Importamos el context
import AuthContext from './context/AuthContext';
//importamos Navigation
import Navigation from './routes/Navigation';
import { SocketProvider } from './context/SocketContext';


export default function App() {
  const [auth, setAuth] = useState(undefined);


  useEffect(() => {
    const token = getToken()
    if(!token){
      setAuth(null);
    }else{
      setAuth(token);
    }
    return () => {
      
    }
  }, []);

  const logout = () => {
    console.log("Cerrar Sesion")
  };

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  return (
    // ApolloProvider para utilizar el sevidor con el cliente
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {/* Auth para usuario no loggeado */}
        {!auth ? <Auth /> : <SocketProvider><Navigation/></SocketProvider>}
        {/* uso de toast container */}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>

  );
}

