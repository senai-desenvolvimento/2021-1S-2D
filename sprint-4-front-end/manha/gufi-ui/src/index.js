import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import App from './pages/home/App';
import Login from './pages/login/login';
import TiposEventos from './pages/tiposEventos/tiposEventos';
import NotFound from './pages/notFound/notFound';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component }) => (
  <Route
    render = { props =>
      // Verifica se o usuário está logado e se ele é Administrador
      usuarioAutenticado() && parseJwt().role === "1" ?
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> :
      // Se não, redireciona para a página de login
      <Redirect to = 'login' />
    }
  />
);

const PermissaoComum = ({ component : Component }) => (
  <Route
    render = { props =>
      // Verifica se o usuário está logado e se é do tipo Comum
      usuarioAutenticado() && parseJwt().role === "2" ?
      // Se sim, renderiza de acordo com a rota solicitada e permitida
      <Component {...props} /> :
      // Se não, redireciona para a página de login
      <Redirect to = 'login' />
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} /> {/* Home */}
        <Route path="/login" component={Login} /> {/* Login */}
        <PermissaoAdm path="/tiposeventos" component={TiposEventos} /> {/* Tipos de Eventos */}
        <Route exact path="/notfound" component={NotFound} /> {/* Not Found */}
        <Redirect to="/notfound" /> {/* Redireciona para NotFound caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
