import axios from 'axios';
import {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsError,
  addItemRequest,
  addItemsSuccess,
  addItemError,
  editItemRequest,
  editItemsSuccess,
  editItemError,
  deleteItemRequest,
  deleteItemsSuccess,
  deleteItemError,
} from './items-actions';

import { listsOperation } from '../lists';

const fetchItems = () => dispatch => {
  dispatch(fetchItemsRequest());

  axios
    .get('/items')
    .then(({ data }) => dispatch(fetchItemsSuccess(data.data)))
    .catch(error => dispatch(fetchItemsError(error.message)));
};

const addItem = (values, idList = null) => dispatch => {
  console.log(dispatch);
  dispatch(addItemRequest());
  axios
    .post('/items', values)
    .then(({ data }) => {
      dispatch(addItemsSuccess(data.item));
      return data.item._id;
    })
    .then(idItem => {
      console.log(idItem);
      console.log(idList);

      if (idList) {
        dispatch(listsOperation.addItemList({ idList, idItem }));
      }
    })
    .catch(error => dispatch(addItemError(error.message)));
};

const editItem = values => dispatch => {
  dispatch(editItemRequest());
  const { id } = values;
  delete values.id;

  axios
    .patch(`/items/${id}`, values)
    .then(({ data }) => dispatch(editItemsSuccess(data.item)))
    .catch(error => dispatch(editItemError(error.message)));
};

const deleteItem = itemId => async dispatch => {
  dispatch(deleteItemRequest());
  try {
    await axios.delete(`/items/${itemId}`);
    dispatch(deleteItemsSuccess(itemId));
  } catch (error) {
    let message = '';
    if (error.response) {
      message = error.response.data.message;
    } else if (error.request) {
      message = error.request.data.message;
    } else {
      message = error.message;
    }
    dispatch(deleteItemError(message));
  }
};

const operationItems = {
  fetchItems,
  addItem,
  deleteItem,
  editItem,
};

export default operationItems;
