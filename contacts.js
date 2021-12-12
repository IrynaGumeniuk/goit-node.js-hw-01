const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const crypto = require('crypto');

const readContent = async () => {
    const content = await fs.readFile(
        path.join(__dirname, 'db', 'contacts.json'),
        'utf8',
    )
    const result = JSON.parse(content)
    return result
}

const listContacts = async () => {
    return await readContent()
}

const getContactById = async (contactId) => {
    const contacts = await readContent()
    const result = contacts.find((contact) => contact.id === contactId)
    return result;
}


const removeContact = async (contactId) => {
    const contacts = await readContent();
    const result = contacts.filter((contact) => contact.id !== contactId);
    const removedContact = contacts.find((contact) => contact.id === contactId)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contacts.json'),
        JSON.stringify(result)
    )
    return removedContact;
}


const addContact = async (name, email, phone) => {
    const contacts = await readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() };


    if (newContact.name && newContact.email && newContact.phone && newContact.id) {
        contacts.push(newContact);
        await fs.writeFile(
            path.join(__dirname, 'db', 'contacts.json'),
            JSON.stringify(contacts, null, 2)
        )
        console.table(chalk.green('Your contact was successfully added!!'))
    } else {
        console.log(chalk.red('Please enter all parameters: name, email, phone, id'))
    }
    return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact };
