'use strict';

import { React } from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    render() {
        return (
            <nav className="Menu">
                <Link key="Index" to="/" activeClassName="active">Home</Link>
                {/*<Link key="clients" to="/" activeClassName="active">Clients</Link>
                <Link key="invoices" to="/" activeClassName="active">Invoices</Link>*/}
            </nav>
        );
    }
}