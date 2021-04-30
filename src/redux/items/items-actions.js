import { createAction } from '@reduxjs/toolkit';

export const fetchItemsRequest = createAction('Items/fetchItemsRequest');
export const fetchItemsSuccess = createAction('Items/fetchItemsSuccess');
export const fetchItemsError = createAction('Items/fetchItemsError');

export const addItemRequest = createAction('Items/addItemRequest');
export const addItemsSuccess = createAction('Items/addItemsSuccess');
export const addItemError = createAction('Items/addItemError');

export const editItemRequest = createAction('Items/editItemRequest');
export const editItemsSuccess = createAction('Items/editItemsSuccess');
export const editItemError = createAction('Items/editItemError');

export const deleteItemRequest = createAction('Items/deleteItemRequest');
export const deleteItemsSuccess = createAction('Items/deleteItemsSuccess');
export const deleteItemError = createAction('Items/deleteItemError');

export const changeItemFilter = createAction('Items/changeFilter');
