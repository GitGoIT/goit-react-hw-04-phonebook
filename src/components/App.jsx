import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts && contacts.length) {
      // cheking for if 'my-contacts' is in LS and it lenght > 0, than 'true'
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      // setItem to LS works only if add new contact, but not for filter changes
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      // cheking for dublicate in state list
      return alert(`Name: "${name}" or number: "${number}" is already in contacts, please check the contacts list`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts]};
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      // cheking if filter input is empty (false) then do nothing
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 26,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      </div>
    );
  }
}
