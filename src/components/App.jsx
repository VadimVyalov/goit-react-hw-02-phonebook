import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Container from './Container';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onAddContact = evt => {
    // evt.preventDefault();
    // const data = new FormData(evt.currentTarget);
    // this.setState(prevState => ({
    //   contacts: [
    //     ...prevState.contacts,
    //     { id: nanoid(10), ...Object.fromEntries(data) },
    //   ],
    // }));

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(10), ...evt }],
    }));
  };

  onRemoveContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  onChangeFilter = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <Container>
        <ContactForm contacts={contacts} newContact={this.onAddContact} />

        <Filter filter={filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={filtredContacts}
          deleteContact={this.onRemoveContact}
        />
      </Container>
    );
  }
}
