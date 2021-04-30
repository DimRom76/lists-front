import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
  changeItemFilter,
} from './items-actions';

const items = createReducer([], {
  [fetchItemsSuccess]: (_, { payload }) => payload.items,
  [addItemsSuccess]: (state, { payload }) => [...state, payload],
  [deleteItemsSuccess]: (state, { payload }) =>
    state.filter(item => item._id !== payload),
  [editItemsSuccess]: (state, { payload }) =>
    state.map(item => (item._id === payload._id ? payload : item)),
});

const filter = createReducer('', {
  [changeItemFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchItemsRequest]: () => true,
  [fetchItemsSuccess]: () => false,
  [fetchItemsError]: () => false,
  [addItemRequest]: () => true,
  [addItemsSuccess]: () => false,
  [addItemError]: () => false,
  [editItemRequest]: () => true,
  [editItemsSuccess]: () => false,
  [editItemError]: () => false,
  [deleteItemRequest]: () => true,
  [deleteItemsSuccess]: () => false,
  [deleteItemError]: () => false,
});

const error = createReducer(null, {});

const itemsReducer = combineReducers({
  items,
  filter,
  loading,
  error,
});

export default itemsReducer;
