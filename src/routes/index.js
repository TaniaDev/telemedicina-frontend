import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Create from '../views/Create';
import Read from '../views/Read';
import Update from '../views/Update';
import Delete from '../views/Delete';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/cadastro" exact component={}/>
                <Route path="/index" exact component={}/>
                <Route path="/usuario/:id" exact component={}/>
                <Route path="/usuario/:id" exact component={}/>

            </Switch>
        </BrowserRouter>
    )
}