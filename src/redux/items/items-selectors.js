import { createSelector } from '@reduxjs/toolkit';

export const getAllItems = state => state.items.items;

export const getFilter = state => state.items.filter;

export const getLoading = state => state.items.loading;

export const getError = state => state.items.error;

export const getVisibleItems = createSelector(
  [getAllItems, getFilter],
  (allItems, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return allItems.filter(el => {
      const foundPos = el.name.toLowerCase().indexOf(normalizedFilter);
      return foundPos === -1 ? false : true;
    });
  },
);

const operationSelectors = {
  getAllItems,
  getFilter,
  getLoading,
  getError,
  getVisibleItems,
};

export default operationSelectors;
