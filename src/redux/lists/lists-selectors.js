import { createSelector } from '@reduxjs/toolkit';

export const getAllLists = state => state.lists.lists;

export const getFilter = state => state.lists.filter;

export const getLoading = state => state.lists.loading;

export const getVisibleLists = createSelector(
  [getAllLists, getFilter],
  (allLists, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return allLists.filter(el => {
      const foundPos = el.name.toLowerCase().indexOf(normalizedFilter);
      return foundPos === -1 ? false : true;
    });
  },
);

const operationSelectors = {
  getAllLists,
  getFilter,
  getLoading,
  getVisibleLists,
};

export default operationSelectors;
