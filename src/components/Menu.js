'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    render() {
        return (
            <nav className="Menu">
                <Link to="/" activeClassName="active">Home</Link>
                <Link to="/clients" activeClassName="active">Clients</Link>
                <Link to="/invoices" activeClassName="active">Invoices</Link>
            </nav>
        );
    }
}