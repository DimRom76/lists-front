import { useSelector, useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import { listsSelectors, changeFilter } from '../../redux/lists';

//import s from './filter.module.css';

function Filter() {
  const value = useSelector(listsSelectors.getFilter);

  const dispatch = useDispatch();

  return (
    <TextField
      id="value"
      type="text"
      label="Поиск по имени"
      value={value}
      onChange={e => dispatch(changeFilter(e.target.value))}
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
