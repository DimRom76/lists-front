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

export const deleteListRequest = createAction('Lists/deleteListRequest');
export const deleteListsSuccess = createAction('Lists/deleteListsSuccess');
export const deleteListError = createAction('Lists/deleteListError');

export const changeFilter = createAction('Lists/changeFilter');
