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
} from './lists-actions';

const fetchLists = () => dispatch => {
  dispatch(fetchListsRequest());

  axios
    .get('/Lists')
    .then(({ data }) => dispatch(fetchListsSuccess(data)))
    .catch(error => dispatch(fetchListsError(error)));
};

const addList = values => dispatch => {
  dispatch(addListRequest());

  axios
    .post('/Lists', values)
    .then(({ data }) => {
      return dispatch(addListsSuccess(data));
    })
    .catch(error => dispatch(addListError(error)));
};

const editList = values => dispatch => {
  dispatch(editListRequest());
  const { id } = values;
  delete values.id;

  axios
    .patch(`/Lists/${id}`, values)
    .then(({ data }) => {
      return dispatch(editListsSuccess(data));
    })
    .catch(error => dispatch(editListError(error)));
};

const deleteList = ListId => dispatch => {
  dispatch(deleteListRequest());

  axios
    .delete(`/Lists/${ListId}`)
    .then(() => dispatch(deleteListsSuccess(ListId)))
    .catch(error => dispatch(deleteListError(error)));
};

const operationLists = {
  fetchLists,
  addList,
  deleteList,
  editList,
};

export default operationLists;
