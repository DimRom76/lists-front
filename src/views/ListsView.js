import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';

import Lists from '../Components/Lists';
import ListsForm from '../Components/ListForm';
import AddItemForm from '../Components/AddItemForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { listsOperation, listsSelectors } from '../redux/lists';

function ListsView() {
  const isListsLoading = useSelector(listsSelectors.getLoading);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editList, setEditList] = useState({});

  useEffect(() => {
    const fetchLists = () => dispatch(listsOperation.fetchLists());

    fetchLists();
  }, [dispatch]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditList({});
  };

  const currentEditList = editList => {
    setShowModal(!showModal);
    setEditList(editList);
  };

  const toggleAddItemModal = () => {
    setShowAddItemModal(!showAddItemModal);
    setEditList({});
  };

  const addItemToList = editList => {
    setShowAddItemModal(!showAddItemModal);
    setEditList(editList);
  };

  return (
    <div className="container">
      {isListsLoading && (
        <Modal>
          <h1>Обработка данных...</h1>
        </Modal>
      )}

      <Paper className="paper">
        <Mainbar onClick={toggleModal} element="list" />

        <h2>Lists</h2>

        <Lists onEditList={currentEditList} onAddItem={addItemToList} />
      </Paper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ListsForm onSave={toggleModal} editList={editList} />
        </Modal>
      )}

      {showAddItemModal && (
        <Modal onClose={toggleAddItemModal}>
          <AddItemForm onSave={toggleAddItemModal} editList={editList} />
        </Modal>
      )}
    </div>
  );
}

export default ListsView;
