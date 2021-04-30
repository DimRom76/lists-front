import Filter from '../Filter/Filter';
import AddIcon from '@material-ui/icons/Add';
import s from './Mainbar.module.css';

function Mainbar({ onClick, element }) {
  return (
    <div className={s.mainBar}>
      <Filter element={element} />
      <button className={s.addBtn} type="button" onClick={onClick}>
        <AddIcon element={element} />
      </button>
    </div>
  );
}

export default Mainbar;
