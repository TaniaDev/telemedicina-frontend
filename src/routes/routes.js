import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cadastro from '../pages/Cadastro/index'
import Login from '../pages/Login/index'

export default function Routes() {
    return (
        <Router>
            <Route exact path='/' component={Login} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/login' component={Login} />
        </Router>
    );
}