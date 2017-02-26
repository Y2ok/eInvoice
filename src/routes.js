'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage} />
    </Route>
);