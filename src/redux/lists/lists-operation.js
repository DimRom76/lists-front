import axios from 'axios';
import {
  fetchListsRequest,
  fetchListsSuccess,
  fetchListsError,
  addListRequest,
  addListsSuccess,
  addListError,
  editListRequest,
  editListsSuccess,
  editListError,
  deleteListRequest,
  deleteListsSuccess,
  deleteListError,
  deleteItemListRequest,
  deleteItemListsSuccess,
  deleteItemListError,
} from './lists-actions';

const fetchLists = () => dispatch => {
  dispatch(fetchListsRequest());

  axios
    .get('/lists')
    .then(({ data }) => dispatch(fetchListsSuccess(data.data)))
    .catch(error => dispatch(fetchListsError(error)));
};

const addList = values => dispatch => {
  dispatch(addListRequest());
  axios
    .post('/lists', values)
    .then(({ data }) => dispatch(addListsSuccess(data.list)))
    .catch(error => dispatch(addListError(error)));
};

const editList = values => dispatch => {
  dispatch(editListRequest());
  const { id } = values;
  delete values.id;

  axios
    .patch(`/lists/${id}`, values)
    .then(({ data }) => dispatch(editListsSuccess(data.list)))
    .catch(error => dispatch(editListError(error)));
};

const deleteList = listId => dispatch => {
  dispatch(deleteListRequest());
  axios
    .delete(`/lists/${listId}`)
    .then(() => dispatch(deleteListsSuccess(listId)))
    .catch(error => dispatch(deleteListError(error)));
};

const deleteItemList = ({ idList, idItem }) => dispatch => {
  dispatch(deleteItemListRequest());

  const body = {
    item: idItem,
  };

  axios
    .patch(`/lists/${idList}/deleteItem`, body)
    .then(data => dispatch(deleteItemListsSuccess(data.data.list)))
    .catch(error => dispatch(deleteItemListError(error)));
};

const operationLists = {
  fetchLists,
  addList,
  deleteList,
  deleteItemList,
  editList,
};

export default operationLists;
