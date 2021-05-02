import { useFormik } from 'formik';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ListForm.module.css';
import { useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Button, TextField } from '@material-ui/core';

import { listsOperation } from '../../redux/lists';

function ListForm({ onSave, editList }) {
  const dispatch = useDispatch();

  const onSubmitNew = value => dispatch(listsOperation.addList(value));
  const onChangeList = value => dispatch(listsOperation.editList(value));

  function onSubmitForm(values, setSubmitting, resetForm) {
    setSubmitting(false);

    idList ? onChangeList({ ...values, id: idList }) : onSubmitNew(values);

    onSave();
    resetForm();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Requerid'),
  });

  let { idList, name } = editList;
  if (!idList) {
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
        {idList ? 'Редактировать' : 'Новый список'}
      </Button>
    </form>
  );
}

ListForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ListForm;
