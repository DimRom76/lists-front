import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

import { listsOperation, listsSelectors } from '../../redux/lists';

import s from './Lists.module.css';

function Lists({ onEditList }) {
  const lists = useSelector(listsSelectors.getVisibleLists);
  const dispatch = useDispatch();

  const onDeleteList = id => dispatch(listsOperation.deleteList(id));

  return (
    <ul className={s.older}>
      {lists.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <div className="list_container">
              <p>{name}</p>
            </div>
            <div className={s.buttom_group}>
              <button
                className={s.button_list}
                onClick={() => onEditList({ idList: id, name, number })}
              >
                <EditIcon />
              </button>
              <button
                className={s.button_list}
                onClick={() => onDeleteList(id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

Lists.propTypes = {
  onEditList: PropTypes.func.isRequired,
};

export default Lists;
