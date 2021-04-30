import { useSelector, useDispatch } from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import PropTypes from 'prop-types';

import { listsOperation, listsSelectors } from '../../redux/lists';

import s from './Lists.module.css';

function Lists({ onEditList }) {
  const lists = useSelector(listsSelectors.getVisibleLists);
  const dispatch = useDispatch();

  const onDeleteList = id => dispatch(listsOperation.deleteList(id));
  const onDeleteItemList = (idList, idItem) =>
    dispatch(listsOperation.deleteItemList({ idList, idItem }));

  return (
    <ul className={s.older}>
      {lists.map(({ _id, name, number, items }) => {
        return (
          <li key={_id} className={s.liList}>
            <div className="list_container">
              <p>{name}</p>
              <ul>
                {items.map(el => {
                  return (
                    <li key={el.item._id}>
                      <p className={s.item_text}>{el.item.name}</p>
                      <button
                        className={s.button_list}
                        onClick={() => onDeleteItemList(_id, el.item._id)}
                      >
                        <DeleteIcon style={{ fontSize: 14 }} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={s.buttom_group}>
              <button
                className={s.button_list}
                //TODO
                onClick={() => onEditList({ idList: _id, name, number })}
              >
                <AddIcon />
              </button>
              <button
                className={s.button_list}
                onClick={() => onEditList({ idList: _id, name, number })}
              >
                <EditIcon />
              </button>
              <button
                className={s.button_list}
                onClick={() => onDeleteList(_id)}
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
