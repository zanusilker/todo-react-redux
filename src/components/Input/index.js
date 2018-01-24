import React, { Component } from 'react';

import { connect } from 'react-redux';

import { updateTodo, newText, addNewTodo } from '../../actions/todo';
import { pushTo } from '../../actions/push';

import './index.scss';

class Input extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    body: ''
  };

  componentDidMount() {
    const {
      todo
    } = this.props;

    if (todo) {
      this.setState({
        body: todo.body
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo) {
      this.setState({
        body: nextProps.todo.body
      })
    }
  }

  addNewItem = (e) => {
    const { addNewTodo } = this.props;

    if (e.key === 'Enter') {
      addNewTodo(e.target.value)
    }
  };

  changeNewValue = (e) => {
    const { newText } = this.props;

    let text = e.target.value;

    newText(text)
  };

  changeTodo = (e) => {
    const {
      todo,
      updateTodo,
      id
    } = this.props;

    if (e.charCode === 13) {
      e.preventDefault();

      let obj = {
        id: todo.id,
        body: e.target.value
      };

      updateTodo(obj, id)
    }
  };

  changeInput = (e) => {
    this.setState({
      body: e.target.value
    })
  };

  render() {
    const {
      text,
      id,
      pushTo
    } = this.props;

    const {
      body
    } = this.state;

    // If it is editing
    if (id) {
      return (
        <div className="edit-todo">
          <input
            className="create-todo"
            placeholder="Editing..."
            onKeyPress={ this.changeTodo }
            value={ body }
            onChange={ this.changeInput }
          />
          <span onClick={ () => pushTo('/') } title="Close editing"> X </span>
        </div>
      );
    } else {
      return (
        <input
          className="create-todo"
          placeholder="What needs to be done?"
          onChange={ this.changeNewValue }
          onKeyPress={ this.addNewItem }
          value={ text }
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.inputText,
    todo: state.todos.filter((todo) => todo.id === ownProps.id)[0]
  }
};

export default connect(mapStateToProps, { pushTo, updateTodo, newText, addNewTodo })(Input)
