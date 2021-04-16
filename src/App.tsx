import React, { FunctionComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Landing = lazy(() => import('./components/landing/Landing'));
const Admin = lazy(() => import('./components/admin/Admin'));

const App: FunctionComponent = (): JSX.Element => (
    <BrowserRouter>
      <Suspense fallback={<div className="app-loading">Загрузка</div>}>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </BrowserRouter>
);


export default App;
