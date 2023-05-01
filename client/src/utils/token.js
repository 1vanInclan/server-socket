// Importamos jwtdecode para decodificar el token
import jwtDecode from "jwt-decode";
import {TOKEN} from "./constanst";

// Pasar token para guardar en localstorage
export function setToken(token){
    localStorage.setItem(TOKEN, token)
}

export function getToken(){
    return localStorage.getItem(TOKEN)
}

export function decodeToken(token){
    return jwtDecode(token);
}