//App that is imported by the index.js file
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Bar from './components/Bar/Bar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter> 
            <Container maxwidth="lg">
                <Bar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    {!user ?  <Route path="/auth" element={<Auth />} />
                    : <Route path="/auth" element={<Navigate to="/posts/" />} />}
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

  export default App;