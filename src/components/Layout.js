import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Dashboard />
            {children}
        </>
    );
};

export default Layout;