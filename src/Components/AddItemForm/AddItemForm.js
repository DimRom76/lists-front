import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

import { itemsOperation, itemsSelectors } from '../../redux/items';
import { listsOperation } from '../../redux/lists';

import s from './AddItemForm.module.css';

const createOption = (label, value) => ({
  label,
  value,
});

const defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
];

function AddItemForm({ onSave, editList }) {
  const [options, setOptions] = useState(defaultOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(undefined);

  const dispatch = useDispatch();
  const items = useSelector(itemsSelectors.getAllItems);

  useEffect(() => {
    if (items.length === 0) {
      const fetchItems = () => dispatch(itemsOperation.fetchItems());
      fetchItems();
    }

    const itemOptions = items.map(el => createOption(el.name, el._id));
    setOptions(itemOptions);
  }, [dispatch, items]);

  const onAddItemList = (idList, idItem) =>
    dispatch(listsOperation.addItemList({ idList, idItem }));

  const handleChange = (newValue, actionMeta) => {
    if (newValue === null) {
      return;
    }
    onAddItemList(editList.idList, newValue.value);
    setValue(newValue);
    onSave();
  };

  const handleCreate = inputValue => {
    setIsLoading(true);

    //создать новый элемент, добавить этот элемент в список

    console.group('Option created');
    console.log('Wait a moment...');

    dispatch(itemsOperation.addItem({ name: inputValue }, editList.idList));
    onSave();

    // setTimeout(() => {
    //   const newOption = createOption(inputValue);

    //   console.log(newOption);
    //   console.groupEnd();

    //   setIsLoading(false);
    //   setOptions([...options, newOption]);
    //   setValue(newOption);

    // }, 1000);
  };

  return (
    <div className={s.itemSelect}>
      <CreatableSelect
        autoFocus={true}
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </div>
  );
}

export default AddItemForm;
