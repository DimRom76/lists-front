import { createAction } from '@reduxjs/toolkit';

export const fetchListsRequest = createAction('Lists/fetchListsRequest');
export const fetchListsSuccess = createAction('Lists/fetchListsSuccess');
export const fetchListsError = createAction('Lists/fetchListsError');

export const addListRequest = createAction('Lists/addListRequest');
export const addListsSuccess = createAction('Lists/addListsSuccess');
export const addListError = createAction('Lists/addListError');

export const editListRequest = createAction('Lists/editListRequest');
export const editListsSuccess = createAction('Lists/editListsSuccess');
export const editListError = createAction('Lists/editListError');

export const checkListRequest = createAction('Lists/checkListRequest');
export const checkListsSuccess = createAction('Lists/checkListsSuccess');
export const checkListError = createAction('Lists/checkListError');

export const deleteListRequest = createAction('Lists/deleteListRequest');
export const deleteListsSuccess = createAction('Lists/deleteListsSuccess');
export const deleteListError = createAction('Lists/deleteListError');

export const addItemListRequest = createAction('Lists/addItemListRequest');
export const addItemListsSuccess = createAction('Lists/addItemListsSuccess');
export const addItemListError = createAction('Lists/addItemListError');

export const checkItemListRequest = createAction('Lists/checkItemListRequest');
export const checkItemListsSuccess = createAction(
  'Lists/checkItemListsSuccess',
);
export const checkItemListError = createAction('Lists/checkItemListError');

export const deleteItemListRequest = createAction(
  'Lists/deleteItemListRequest',
);
export const deleteItemListsSuccess = createAction(
  'Lists/deleteItemListsSuccess',
);
export const deleteItemListError = createAction('Lists/deleteItemListError');

export const changeFilter = createAction('Lists/changeFilter');
