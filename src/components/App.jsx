// import { ContactForm } from "./ContactForm/ContactForm.jsx"
import { Component } from "react";
import { nanoid } from "nanoid";
import propTypes from 'prop-types';
import css from './/ContactForm/ContactForm.module.css';


export class App extends Component {

   state = {
        contacts: [
           {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
           {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
           {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
           {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
       ],
       name: '',
       number: '',
       filter: ''
    }

    addContact = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            const { name, number, contacts } = prevState;
            if (this.isDublicate(name, number)) {    // cheking for dublicate in state list
                return alert(`${name} is already in contacts`)
            }
            const newContact = {
                id: nanoid(),
                name,
                number, 
            }
            return {contacts: [newContact, ...contacts], name:"", number:""}
        })       
    }

    deleteContact (id) {
        this.setState(({ contacts }) => {
            const newContacts = contacts.filter(contact => contact.id !== id);
            return { contacts: newContacts}
       })
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
        
    }

    isDublicate(name, number) {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();
        const { contacts } = this.state;
        const result = contacts.find(({ name, number }) => {
            return (name.toLowerCase() === normalizedName && number.toLowerCase() === normalizedNumber)   
        })
        return Boolean(result)
    }

    getFilteredContacts() {
        const { filter, contacts } = this.state;
        if (!filter) {   // cheking if filter input is empty (false) then do nothing
            return contacts;
        }
        const normalizedFilter = filter.toLowerCase();
        const result = contacts.filter(({ name, number }) => {
            return (name.toLowerCase().includes(normalizedFilter) || number.toLowerCase().includes(normalizedFilter) )
        })
        return result;
  }

  render() {
    const { addContact, handleChange } = this;
    const { name, number } = this.state
    const contacts = this.getFilteredContacts();
    const contact = contacts.map(({ id, name, number }) => <li key={id}>{name}: {number}<button onClick={() => this.deleteContact(id)} type="button">Delete</button></li>)
       
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <h1>Phonebook</h1>
        <form action="" className={css.container} onSubmit={addContact}>
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

        <h2>Contacts</h2>
        <div>
                    <label htmlFor="">Find contacts by name</label>
                    <input name="filter" onChange={handleChange} type="text" />
                </div>
        
                <ul>
                   {contact} 
                </ul>
      </div>
    );
  };
};
