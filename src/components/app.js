import React, { Component } from 'react';
import '../../node_modules/normalize.css/normalize.css';
import '../assets/css/style.scss';
import './index.scss';
import EditTodo from '../components/EditTodo/';
import Input from '../components/Input/';
import TodoList from '../components/TodoList/';
import Filters from '../components/Filters/';
import ModalError from '../components/ModalError/';
import ModalRemoveTodo from '../components/ModalRemoveTodo/';
import ModalChangeLabel from '../components/ModalChangeLabel/';
import { Switch, Route } from 'react-router-dom'

const Todos = () => (
  <div>
    <Input />
    <TodoList />
    <Filters />
  </div>
);


export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="todo-app">
        <h1>Todos</h1>

        <div className="todo">
          <div className="todo__list">
            <Route path="/" component={ Todos } />
          </div>
          <Route className="todo__edit" path="/:id/" component={ EditTodo } />
        </div>

        <Switch>
          <Route path="/:id/error" component={ ModalError } />
          <Route path="/:id/remove-todo" component={ ModalRemoveTodo } />
          <Route path="/:id/change-label" component={ ModalChangeLabel } />
        </Switch>

      </div>
    );
  }
}

