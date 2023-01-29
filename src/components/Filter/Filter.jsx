import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({handleChange}) => {
    
    return(
            <div className={css.container}>
                    <label htmlFor="">Find contacts by name</label>
                    <input name="filter" onChange={handleChange} type="text" className={css.input}/>
            </div>
    )
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
}