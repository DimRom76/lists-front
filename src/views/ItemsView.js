import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';

import Items from '../Components/Items';
import ItemsForm from '../Components/ItemForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { itemsOperation, itemsSelectors } from '../redux/items';

function ItemsView() {
  const isItemsLoading = useSelector(itemsSelectors.getLoading);
  const dispatch = useDispatch();

  const [showModal, setshowModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    const fetchItems = () => dispatch(itemsOperation.fetchItems());

    fetchItems();
  }, [dispatch]);

  const toggleModal = () => {
    setshowModal(!showModal);
    setEditItem({});
  };

  const currentEditItem = editItem => {
    setshowModal(!showModal);
    setEditItem(editItem);
  };

  return (
    <div className="container">
      {isItemsLoading && (
        <Modal>
          <h1>Обработка данных...</h1>
        </Modal>
      )}

      <Paper className="paper">
        <Mainbar onClick={toggleModal} element="item" />

        <h2>Items</h2>

        <Items onEditItem={currentEditItem} />
      </Paper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ItemsForm onSave={toggleModal} editItem={editItem} />
        </Modal>
      )}
    </div>
  );
}

export default ItemsView;
