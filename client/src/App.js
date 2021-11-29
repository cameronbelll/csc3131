//App that is imported by the index.js file
import React from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Bar from './components/Bar/Bar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
    <BrowserRouter> 
        <Container maxwidth="lg">
            <Bar />
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/auth" exact element={<Auth/>} />
            </Routes>
        </Container>
    </BrowserRouter>
    
);

export default App;