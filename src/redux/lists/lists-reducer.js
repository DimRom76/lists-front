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
  changeFilter,
} from './lists-actions';

const lists = createReducer([], {
  [fetchListsSuccess]: (_, { payload }) => payload,
  [addListsSuccess]: (state, { payload }) => [...state, payload],
  [deleteListsSuccess]: (state, { payload }) =>
    state.filter(List => List.id !== payload),
  [editListsSuccess]: (state, { payload }) =>
    state.map(todo => (todo.id === payload.id ? payload : todo)),
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
});

const error = createReducer(null, {});

const listsReducer = combineReducers({
  lists,
  filter,
  loading,
  error,
});

export default listsReducer;
