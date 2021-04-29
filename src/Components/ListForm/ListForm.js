import { useFormik } from 'formik';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './ListForm.module.css';
import { useSelector, useDispatch } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import PhoneIcon from '@material-ui/icons/Phone';
import { Button, TextField } from '@material-ui/core';

import InputMask from 'react-input-mask';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { listsOperation, listsSelectors } from '../../redux/lists';

function ListForm({ onSave, editList }) {
  const lists = useSelector(listsSelectors.getAlllists);
  const dispatch = useDispatch();

  const onSubmitNew = value => dispatch(listsOperation.addList(value));
  const onChangeList = value => dispatch(listsOperation.editList(value));

  function onSubmitForm(values, setSubmitting, resetForm) {
    setSubmitting(false);
    const findEl = lists.find(
      ({ name, number, id }) =>
        (name.toLowerCase() === values.name.toLowerCase() ||
          number === values.number) &&
        id !== idList,
    );
    if (findEl) {
      toast.warn(
        `Запись уже есть в базе. Имя:${findEl.name}, номер:${findEl.number}`,
      );
      return;
    }

    idList ? onChangeList({ ...values, id: idList }) : onSubmitNew(values);

    onSave();
    resetForm();
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Requerid'),
    number: Yup.string().length(19, 'Wrong length!').required('Requerid'),
  });

  let { idList, name, number } = editList;
  if (!idList) {
    name = '';
    number = '';
  }

  const formik = useFormik({
    initialValues: {
      name,
      number,
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
    if (formik.values.number === '') {
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
              <NameIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <InputMask
        mask="+38 (999) 999 99 99"
        maskChar=""
        value={formik.values.number}
        onChange={formik.handleChange}
        id="number"
        name="number"
        error={formik.touched.number && Boolean(formik.errors.number)}
        helperText={formik.touched.number && formik.errors.number}
      >
        {props => {
          return (
            <TextField
              {...props}
              fullWidth
              style={{ marginTop: 10 }}
              label="Phone"
              type="tel"
              className={s.inputs}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
      </InputMask>

      <Button
        disableRipple
        disabled={!isValid()}
        variant="outlined"
        className={s.button}
        style={{ marginTop: 10 }}
        type="submit"
      >
        {idList ? 'Редактировать' : 'Новый контакт'}
      </Button>
    </form>
  );
}

ListForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ListForm;
