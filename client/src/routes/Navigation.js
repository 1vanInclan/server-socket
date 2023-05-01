//se ocupa de renderizar todas las rutas
import React from 'react'
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LayoutBasic from '../layouts/LayoutBasic';
 
//pages
 
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import User from '../pages/User';
 
 
export default function Navigation() {
 
    const Layout=Route.Layout;
  return (
    <Router>
        <Routes>
            <Route element={<LayoutBasic />}>
                <Route path="/" element={<Home />} />
                <Route path=":username" element={<User />} />
            </Route>
 
            <Route path="*" element={<Error404/>}>
                
            </Route>
        </Routes>
 
    </Router>
  )
}