import axios from 'axios'

function getOneContact(contactId) {
    axios.get(`/api/contact/${contactId}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function getAllContact() {
    axios.get(`/api/contact`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function createContact(contact) {
    axios.post('/api/edit', contact)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function updateContact(contact) {
    axios.put(`/api/edit/${contact.id}`, contact)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

function deleteContact(contact) {
    axios.delete(`/api/edit/${contact.id}`, contact)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}