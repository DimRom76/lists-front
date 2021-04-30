import { useSelector, useDispatch } from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PropTypes from 'prop-types';

import { itemsOperation, itemsSelectors } from '../../redux/items';

import s from './Items.module.css';

function Items({ onEditItem }) {
  const items = useSelector(itemsSelectors.getVisibleItems);
  const dispatch = useDispatch();

  const onDeleteItem = id => dispatch(itemsOperation.deleteItem(id));

  return (
    <ul className={s.older}>
      {items.map(({ _id, name, number }) => {
        return (
          <li key={_id} className={s.liItem}>
            <div className="item_container">
              <p>{name}</p>
            </div>
            <div className={s.buttom_group}>
              <button
                className={s.button_item}
                onClick={() => onEditItem({ idItem: _id, name, number })}
              >
                <EditIcon />
              </button>
              <button
                className={s.button_item}
                onClick={() => onDeleteItem(_id)}
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

Items.propTypes = {
  onEditItem: PropTypes.func.isRequired,
};

export default Items;
