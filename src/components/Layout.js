'use strict';

import React from 'react';
import { Link } from 'react-router';
import Menu from './menu'

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/">
                        e-Invoice
                    </Link>
                    <Menu />
                </header>
                <div className="app-content">
                    {this.props.children}
                </div>
                <footer>
                    <p>All rights reserved e-Invoice &copy; 2017</p>
                </footer>
            </div>
        );
    }
}