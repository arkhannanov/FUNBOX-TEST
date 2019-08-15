import React, {Component} from "react";
import './MapItems.scss';
import deleteIcon from './../../assets/images/delete-icon.png';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from "react-beautiful-dnd";

class MapItems extends Component {

  constructor(props) {
    super(props);

    this.createTasks = this.createTasks.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createTasks(item, index) {
    return (
      <Draggable
        key={item.key}
        draggableId={item.key}
        index={index}>
        {provided => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="list__item"
            key={item.key}>{item.text}
            <img className="list__item-image"
                 src={deleteIcon}
                 alt='Delete Icon'
                 onClick={() => this.delete(item.key)}
            />
          </li>
        )}
      </Draggable>
    );
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map((item, index) => this.createTasks(item, index));

    return (
      <Droppable droppableId='MapItems'>
        {provided => (
          <ul
            ref={provided.innerRef}
            {...provided.dropppableProps}
            className="list">
            {listItems}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    );
  }
};

export default MapItems;