import React, {Component} from 'react';
import { connect } from 'react-redux';

import CONSTANTS from '../../constants';
import TodoItem from '../TodoItem/';

import './index.scss';

class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      todos
    } = this.props;

    return (
      <div className="todo__list">
        {
          todos.map((todo) => <TodoItem key={ todo.index } todo={ todo } />)
        }
      </div>
    );
  }
}

const filterTodos = (todos, filter, text) => {
  switch (filter) {
    case CONSTANTS.FILTER_ALL:
      return todos.filter((t, index) => {
        t.index = index;
        return t.body && t.body.indexOf(text) !== -1;
      });
    case CONSTANTS.FILTER_COMPLETED:
      return todos.filter((t, index) => {
        t.index = index;
        return t.status === 'completed' && t.body.indexOf(text) !== -1;
      });
    case CONSTANTS.FILTER_ACTIVE:
      return todos.filter((t, index) => {
        t.index = index;
        return (t.status === 'new' || t.status === 'in progress') && t.body.indexOf(text) !== -1;
      });
  }
};

const mapStateToProps = (state) => {
  return {
    todos: filterTodos(state.todos, state.filter, state.inputText)
  }
};

export default connect(mapStateToProps, null )(TodoList)
