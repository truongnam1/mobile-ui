import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        return (
            <React.Fragment>

            <div className='todo-item'>
                <p>{this.props.title}</p>
            </div>
            </React.Fragment>
        );
    }
}

export default TodoItem;