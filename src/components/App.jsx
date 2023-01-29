import { Component } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm.jsx"
import { ContactList } from "./ContactList/ContactList.jsx";
import { Filter } from "./Filter/Filter.jsx";
import { contacts } from "./contacts.js";

export class App extends Component {

   state = {
       contacts: [...contacts], // default array from contacts.js
       filter: ''
    }

addContact = ({name, number}) => {
            if (this.isDublicate(name, number)) {    // cheking for dublicate in state list
                return alert(`${name} is already in contacts`)
      }
      this.setState(prevState => {
        const { contacts } = prevState;
        
            const newContact = {
                id: nanoid(),
                name,
                number, 
            }
            return {contacts: [newContact, ...contacts], name:"", number:""}
        })       
}

deleteContact = (id) => {
        this.setState(({ contacts }) => {
            const newContacts = contacts.filter(contact => contact.id !== id);
            return { contacts: newContacts}
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

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value})
  }

  render() {
    const { addContact, deleteContact, handleFilter } = this;
    const contacts = this.getFilteredContacts();
       
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '70vh',
          height: '100vh',
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />        
      </div>
    );
  };
};
