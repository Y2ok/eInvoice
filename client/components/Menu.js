'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <Link to="/" className="navbar-brand">e-Invoice</Link>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/" activeClassName="active">Home</Link>
                        </li>
                        <li>
                            <Link to="/clients" activeClassName="active">Clients</Link>
                        </li>
                        <li>
                            <Link to="/invoices" activeClassName="active">Invoices</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}