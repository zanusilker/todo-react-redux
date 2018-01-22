import React, {Component} from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import CONSTANTS from '../../constants/'
import { actionChangeStatus } from '../../actions/todo';

class ModalChangeLabel extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    label: this.props.status
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  agree = (e) => {
    e.preventDefault();
    let status = this.state.label;

    this.props.actionChangeStatus(this.props.id, status)
  };

  disagree = (e) => {
    e.preventDefault();
    this.props.goBack();
  };

  changeStatus = (e) => {
    this.setState({
      label: e.target.value
    })
  };

  render() {
    const { status } = this.props;
    const { label } = this.state;

    if (this.props.isVisible) {
      return (
        <div>
          <div className="modal-overlay" onClick={ this.handleHide }>
            <form className="modal" onClick={ this.stopPropagation }>
              <div className="modal-content">
                <h4> Do you want change label? </h4>

                <select defaultValue={ status } onChange={ this.changeStatus }>
                  <option value="new">new</option>
                  <option value="in progress">in progress</option>
                  <option value="review">review</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-action"
                  onClick={ this.disagree }
                > Disagree </button>

                <button
                  className="modal-action"
                  onClick={ this.agree }
                  disabled={ label === status }
                > Agree </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  let todo = state.todos.filter((el, index) => index === state.id)[0];

  return {
    status: todo ? todo.status : 'new',
    id: state.id,
    isVisible: state.modals[CONSTANTS.MODAL_STATUS].isVisible
  }
};

export default connect(mapStateToProps, { goBack, actionChangeStatus })(ModalChangeLabel)

