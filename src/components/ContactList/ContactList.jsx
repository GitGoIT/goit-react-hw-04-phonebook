import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
    
    const contact = contacts.map(({ id, name, number }) => <li  className={css.item} key={id}>{name}: {number} 
        <button onClick={() => deleteContact(id)} type="button" className={css.btn}>Delete</button></li>)
    
    return(
            <ul className={css.list}>
                {contact} 
            </ul>
    )
}

ContactList.propTypes = {
    deleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    })) 
}