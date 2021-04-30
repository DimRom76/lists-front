import { useSelector, useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { listsSelectors, changeFilter } from '../../redux/lists';
import { changeItemFilter, itemsSelectors } from '../../redux/items';

//import s from './filter.module.css';

function Filter({ element }) {
  const dispatch = useDispatch();

  let selector;
  if (element === 'list') {
    selector = listsSelectors.getFilter;
  } else {
    selector = itemsSelectors.getFilter;
  }

  const value = useSelector(selector);

  const onChange = e => {
    let change;
    if (element === 'list') {
      change = changeFilter(e.target.value);
    } else {
      change = changeItemFilter(e.target.value);
    }
    dispatch(change);
  };

  return (
    <TextField
      id="value"
      type="text"
      label="Поиск по имени"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Filter;
