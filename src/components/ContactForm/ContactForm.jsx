import { Component } from "react";
import PropTypes from 'prop-types';
import css from './/ContactForm.module.css';


export class ContactForm extends Component {

    state = {
       name: '',
       number: '',
    };

handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({...this.state});
    this.reset();
    }

reset() {
    this.setState({   // form reset
        name: '',
        number: '',
       })
}

handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })     
}

render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (

        <form className={css.container} onSubmit={handleSubmit}>
                    <div className={css.block}>
                        <label htmlFor="">Name</label>
                        <input onChange={handleChange} value={name} className={css.input}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </div>
                    <div className={css.block}>
                        <label htmlFor="">Number</label>
                        <input onChange={handleChange} value={number} className={css.input}
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </div>
                    <button type="submit" className={css.btn}>Add contact</button>
                </form>
    )  
}    
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

