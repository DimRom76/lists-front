import { useFormik } from 'formik';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ItemForm.module.css';
import { useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Button, TextField } from '@material-ui/core';

import { itemsOperation } from '../../redux/items';

function ItemForm({ onSave, editItem }) {
  const dispatch = useDispatch();

  const onSubmitNew = value => dispatch(itemsOperation.addItem(value));
  const onChangeItem = value => dispatch(itemsOperation.editItem(value));

  function onSubmitForm(values, setSubmitting, resetForm) {
    setSubmitting(false);

    idItem ? onChangeItem({ ...values, id: idItem }) : onSubmitNew(values);

    onSave();
    resetForm();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Requerid'),
  });

  let { idItem, name } = editItem;
  if (!idItem) {
    name = '';
  }

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      onSubmitForm(values, resetForm, setSubmitting);
    },
  });

  function isValid() {
    if (formik.values.name === '') {
      return false;
    }

    return true;
  }

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        style={{ marginTop: 10 }}
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        className={s.inputs}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FormatListBulletedIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <Button
        disableRipple
        disabled={!isValid()}
        variant="outlined"
        className={s.button}
        style={{ marginTop: 10 }}
        type="submit"
      >
        {idItem ? 'Редактировать' : 'Новый элемент'}
      </Button>
    </form>
  );
}

ItemForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ItemForm;
