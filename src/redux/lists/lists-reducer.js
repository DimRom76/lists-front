import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
  changeFilter,
} from './lists-actions';

const lists = createReducer([], {
  [fetchListsSuccess]: (_, { payload }) => payload.lists,
  [addListsSuccess]: (state, { payload }) => [...state, payload],
  [deleteListsSuccess]: (state, { payload }) =>
    state.filter(list => list._id !== payload),
  [deleteItemListsSuccess]: (state, { payload }) =>
    state.map(list => (list._id === payload._id ? payload : list)),
  [editListsSuccess]: (state, { payload }) =>
    state.map(list => (list._id === payload._id ? payload : list)),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchListsRequest]: () => true,
  [fetchListsSuccess]: () => false,
  [fetchListsError]: () => false,
  [addListRequest]: () => true,
  [addListsSuccess]: () => false,
  [addListError]: () => false,
  [editListRequest]: () => true,
  [editListsSuccess]: () => false,
  [editListError]: () => false,
  [deleteListRequest]: () => true,
  [deleteListsSuccess]: () => false,
  [deleteListError]: () => false,
  [deleteItemListRequest]: () => true,
  [deleteItemListsSuccess]: () => false,
  [deleteItemListError]: () => false,
});

const error = createReducer(null, {});

const listsReducer = combineReducers({
  lists,
  filter,
  loading,
  error,
});

export default listsReducer;
