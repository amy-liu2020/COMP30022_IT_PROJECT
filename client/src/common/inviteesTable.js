import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { GetContacts } from '../api';
import { useState } from 'react';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const me = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export const InviteesTable = ({ invitees, onChange, isDisabled=false }) => {
  const { contacts, loading, error } = GetContacts();
  const [selectedValue, setSelectedValue] = useState([]);

  // const invitees.map((each) => GetOneContact(each._id))

  // for (const invitee of invitees) {
  //   const { contact, meetings, loading, error } = GetOneContact(invitee.InviteeID);
  //   names += contact.FirstName + " " + contact.LastName;
  // }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setSelectedValue(typeof value === 'string' ? value.split(',') : value);
    onChange(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    setSelectedValue(invitees ? invitees : []);
  }, [invitees])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Invitees</InputLabel>
        <Select
          multiple
          value={selectedValue}
          onChange={handleChange}
          input={<OutlinedInput label="Chip" />}
          disabled={isDisabled}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.length && selected.map((value) => (
                <Chip key={value} label={contacts.filter(contact => contact._id === value).length && (contacts.filter(contact => contact._id === value)[0].FirstName + " " + contacts.filter(contact => contact._id === value)[0].LastName)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {contacts.map((contact) => (
            <MenuItem
              key={contact._id}
              value={contact._id}
            >
              {contact.FirstName + " " + contact.LastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InviteesTable;
