import React from 'react'
import {Icon, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./RightHeader.scss"
import useAuth from '../../../hooks/useAuth';
import espacio from "../../../assets/images/3d.png"

export default function RightHeader() {
  return (
    <>
        <div className='right-header'>

            <Link to ="/udis">
                <div className='imagen'>
                    <Image src={espacio} avatar />
                    </div>
            </Link>
            
        </div>
    </>
  )
}


//className='rounded-circle img-emotiva'