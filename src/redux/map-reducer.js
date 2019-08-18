import {GoogleAPI} from "../api/api";

const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const HANDLE_DRAG_AND_DROP = 'HANDLE_DRAG_AND_DROP';
const CALCULATE_COORDINATES = 'CALCULATE_COORDINATES';
const CHANGE_COORDINATES = 'CHANGE_COORDINATES';
const ON_MARKER_CLICK = 'ON_MARKER_CLICK';
const ON_CLOSE_INFO_WINDOW = 'ON_CLOSE_INFO_WINDOW';

let initialState = {
  items: [],
  correspondCoordinates: []
};

const mapReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_ITEM:
      let content = action.content;
      let keyIndex = action.key;
      return {
        ...state,
        items: [...state.items, {key: keyIndex, text: content}]
      };
    case DELETE_ITEM:
      let key = action.key;
      let filteredItems = state.items.filter(function (item) {
        return (item.key !== key);
      });
      let filteredCoordinates = state.correspondCoordinates.filter(function (item) {
        return (item.key !== key);
      })
      return {
        ...state,
        items: filteredItems,
        correspondCoordinates: filteredCoordinates
      };
    case HANDLE_DRAG_AND_DROP:

      const {destination, source, draggableId} = action.result;
      if (!destination) {
        return state;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }

      const newItemIds = [];

      for (let i = 0; i < state.items.length; i += 1) {
        newItemIds[i] = state.items[i].key;
      }

      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const itemIds = newItemIds;
      const newItems = [];
      const newCoordinates = [];


      for (let i = 0; i < itemIds.length; i += 1) {
        let searchKey = itemIds[i];
        let itemIndex = state.items.findIndex(el => el.key === searchKey);
        let coordinatesIndex = state.correspondCoordinates.findIndex(el => el.key === searchKey);
        newItems[i] = state.items[itemIndex];
        newCoordinates[i] = state.correspondCoordinates[coordinatesIndex];
      }
      return {
        ...state,
        items: newItems,
        correspondCoordinates: newCoordinates
      };
    case CALCULATE_COORDINATES:
      let actionKey = action.key;
      let coordinates = action.coordinates;
      // let coordinates = {lat: 55.751244, lng: 37.618423};

      return {
        ...state,
        correspondCoordinates: [...state.correspondCoordinates, {
          key: actionKey,
          coordinates: coordinates
        }]
      };
    case CHANGE_COORDINATES:
      let searchKey = action.key;
      let lat = action.lat;
      let lng = action.lng;


      let coordinatesIndex = state.items.findIndex(el => el.key === searchKey);
      let markerNewCoordinates = [];

      for (let i = 0; i < state.correspondCoordinates.length; i += 1) {
        if (i === coordinatesIndex) {
          state.correspondCoordinates[i] = {
            key: searchKey,
            coordinates: {
              lat: lat,
              lng: lng
            }
          }
        }
        markerNewCoordinates[i] = state.correspondCoordinates[i];
      }

      console.log(markerNewCoordinates);
      return {
        ...state,
        correspondCoordinates: markerNewCoordinates
      };

    case ON_MARKER_CLICK:
      let markerKey = action.key;
      let markerIndex = state.items.findIndex(el => el.key === markerKey);
      let newArray = [];

      for (let i = 0; i < state.correspondCoordinates.length; i += 1) {
        if (i === markerIndex) {
          state.correspondCoordinates[i] = {
            key: markerKey,
            coordinates: {
              lat: state.correspondCoordinates[i].coordinates.lat,
              lng: state.correspondCoordinates[i].coordinates.lng,
            },
            text: state.items[i].text,
            open: true
          }
        }
        newArray[i] = state.correspondCoordinates[i];
      }

      return {
        ...state,
        correspondCoordinates: newArray
      };
    case ON_CLOSE_INFO_WINDOW:
      let infoWindowKey = action.key;
      let infoWindowIndex = state.items.findIndex(el => el.key === infoWindowKey);
      let newInfowWindowArray = [];

      for (let i = 0; i < state.correspondCoordinates.length; i += 1) {
        if (i === infoWindowIndex) {
          state.correspondCoordinates[i] = {
            key: infoWindowKey,
            coordinates: {
              lat: state.correspondCoordinates[i].coordinates.lat,
              lng: state.correspondCoordinates[i].coordinates.lng,
            },
            text: null,
            open: false
          }
        }
        newInfowWindowArray[i] = state.correspondCoordinates[i];
      }

      return {
        ...state,
        correspondCoordinates: newInfowWindowArray
      };
    default:
      return state;
  }
}

export const addItem = (key, content) => ({type: ADD_ITEM, key, content});
export const deleteItem = (key) => ({type: DELETE_ITEM, key});
export const handleDragAndDrop = (result) => ({type: HANDLE_DRAG_AND_DROP, result});
export const calculateCoordinates = (key, coordinates) => ({type: CALCULATE_COORDINATES, key, coordinates});
export const changeCoordinates = (key, lat, lng) => ({type: CHANGE_COORDINATES, key, lat, lng });
export const onMarkerClick = (key) => ({type: ON_MARKER_CLICK, key});
export const onCloseInfoWindow = (key) => ({type: ON_CLOSE_INFO_WINDOW, key});


export const getCoordinates = (key, str) => {
  return (dispatch) => {
    GoogleAPI.getCoordinates(str).then(response => {
      const coordinates = response.results[0].geometry.location;
      dispatch(calculateCoordinates(key, coordinates))
    })
  }
}


export default mapReducer;