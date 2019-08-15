import React, {Component} from 'react';
import MapItems from './componets/MapItems/MapItems';
import './Map.scss';
import {DragDropContext} from 'react-beautiful-dnd';
import {
  addItem,
  changeCoordinates,
  deleteItem,
  getCoordinates,
  handleDragAndDrop, onCloseInfoWindow,
  onMarkerClick
} from "./redux/map-reducer";
import connect from "react-redux/es/connect/connect";
import GoogleMapComponent from "./componets/GoogleMapComponent/GoogleMapComponent";

class MapApp extends Component {

  onDragEnd = result => {

    this.props.handleDragAndDrop(result);
  }

  render() {

    let addItem = (e) => {
      let key = Date.now();
      this.props.addItem(key, this._inputElement.value);

      let arr = this._inputElement.value.split(' ');
      let str = arr.join('+');

      this.props.getCoordinates(key, str);

      this._inputElement.value = "";
      e.preventDefault();
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="map">
          <div className="map_title">Вводите адреса, желательно сначала указывать города. Пример: Москва Тверская 12</div>
          <div className="map__container">
            <div className="map__list-container">
              <form onSubmit={addItem}>
                <input className="map__input"
                       ref={(a) => this._inputElement = a}
                       placeholder="Введите адрес">
                </input>
              </form>

              <MapItems
                entries={this.props.items}
                delete={this.props.deleteItem}
              />
            </div>
            <div className="map__map-image-container">
              <GoogleMapComponent
                changeCoordinates={this.props.changeCoordinates}
                correspondCoordinates={this.props.correspondCoordinates}
                onMarkerClick = {this.props.onMarkerClick}
                onCloseInfoWindow = {this.props.onCloseInfoWindow}
              />
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}


let mapStateToProps = (state) => {
  return {
    items: state.map.items,
    correspondCoordinates: state.map.correspondCoordinates
  }
}

export default connect(mapStateToProps, {addItem, deleteItem, handleDragAndDrop,
  getCoordinates, changeCoordinates, onMarkerClick, onCloseInfoWindow })(MapApp);
