import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';

import Lists from '../Components/Lists';
import ListsForm from '../Components/ListForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { listsOperation, listsSelectors } from '../redux/lists';

function ListsView() {
  const isListsLoading = useSelector(listsSelectors.getLoading);
  const dispatch = useDispatch();

  const [showModal, setshowModal] = useState(false);
  const [editList, setEditList] = useState({});

  useEffect(() => {
    const fetchLists = () => dispatch(listsOperation.fetchLists());

    fetchLists();
  }, [dispatch]);

  const toggleModal = () => {
    setshowModal(!showModal);
    setEditList({});
  };

  const currentEditList = editList => {
    setshowModal(!showModal);
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
        <Mainbar onClick={toggleModal} />

        <h2>Lists</h2>

        <Lists onEditList={currentEditList} />
      </Paper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ListsForm onSave={toggleModal} editList={editList} />
        </Modal>
      )}
    </div>
  );
}

export default ListsView;
