import { useSelector, useDispatch } from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import PropTypes from 'prop-types';

import { listsOperation, listsSelectors } from '../../redux/lists';

import s from './Lists.module.css';

function Lists({ onEditList, onAddItem }) {
  const lists = useSelector(listsSelectors.getVisibleLists);
  const dispatch = useDispatch();

  const onDeleteList = id => dispatch(listsOperation.deleteList(id));
  const onCheckList = id => dispatch(listsOperation.checkList(id));

  const onDeleteItemList = (idList, idItem) =>
    dispatch(listsOperation.deleteItemList({ idList, idItem }));

  const onCheckItem = (idList, idItem) =>
    dispatch(listsOperation.checkItemList({ idList, idItem }));

  return (
    <ul className={s.older}>
      {lists.map(({ _id, name, number, items, isCompleted }) => {
        const classList = `${s.list_title} ${isCompleted ? s.text_cross : ''}`;

        return (
          <li key={_id} className={s.liList}>
            <div>
              <p className={classList} onClick={() => onCheckList(_id)}>
                {name}
              </p>
              <ul>
                {items.map(el => {
                  const classText = `${s.item_text} ${
                    el.isCompletedItem ? s.text_cross : ''
                  }`;

                  return (
                    <li key={el.item._id}>
                      <p
                        className={classText}
                        onClick={() => onCheckItem(_id, el.item._id)}
                      >
                        {el.item.name}
                      </p>
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
                onClick={() => onAddItem({ idList: _id })}
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
