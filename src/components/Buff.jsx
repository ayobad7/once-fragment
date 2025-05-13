import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { DevOptions, FoodOptions, DrinkOptions } from './options';
import StandardAutocomplete from './StandardAutocomplete';

const Buff = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1BF, setInputValue1BF] = useState('');
  const [selectedItem1BF, setSelectedItem1BF] = useState(null);
  const [inputValue2BF, setInputValue2BF] = useState('');
  const [selectedItem2BF, setSelectedItem2BF] = useState(null);
  const [inputValue3BF, setInputValue3BF] = useState('');
  const [selectedItem3BF, setSelectedItem3BF] = useState(null);
  const [note, setNote] = useState(''); // ⬅️ New state for Note

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1BF,
        selectedItem2BF,
        selectedItem3BF,
        note, // ⬅️ Include note in save
      });
    }
  }, [
    selectedItem1BF,
    selectedItem2BF,
    selectedItem3BF,
    note, // ⬅️ Trigger save when note changes
    onSave,
  ]);

  // Expose functionality through the `ref`
  useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1BF(null);
      setSelectedItem2BF(null);
      setSelectedItem3BF(null);
      setNote(''); // ⬅️ Reset note
    },
    saveData: () => ({
      selectedItem1BF,
      selectedItem2BF,
      selectedItem3BF,
      note, // ⬅️ Save note
    }),
    loadData: (data) => {
      setSelectedItem1BF(data?.selectedItem1BF ?? '');
      setSelectedItem2BF(data?.selectedItem2BF ?? '');
      setSelectedItem3BF(data?.selectedItem3BF ?? '');
      setNote(data?.note ?? ''); // ⬅️ Load note
    },
  }));

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', bgcolor: '#222323' }}>
      {/* Combat Deviation */}
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#323434',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem' }}>Combat Deviation</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box sx={{ width: '100%' }}>
          <StandardAutocomplete
            options={DevOptions}
            inputValue={inputValue1BF}
            setInputValue={setInputValue1BF}
            selectedItem={selectedItem1BF}
            setSelectedItem={setSelectedItem1BF}
            placeholder='Select Deviation'
            customBgColor='#222323'
          />
        </Box>
      </Box>

      {/* Food Buff */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#323434',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px',
          fontSize: '0.9rem',
        }}
      >
        <Typography sx={{ fontSize: '0.9rem' }}>Food Buff</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box sx={{ width: '100%' }}>
          <StandardAutocomplete
            options={FoodOptions}
            inputValue={inputValue2BF}
            setInputValue={setInputValue2BF}
            selectedItem={selectedItem2BF}
            setSelectedItem={setSelectedItem2BF}
            placeholder='Select Food'
            customBgColor='#222323'
          />
        </Box>
      </Box>

      {/* Drink Buff */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#323434',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px',
          fontSize: '0.9rem',
        }}
      >
        <Typography sx={{ fontSize: '0.9rem' }}>Drink Buff</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box sx={{ width: '100%' }}>
          <StandardAutocomplete
            options={DrinkOptions}
            inputValue={inputValue3BF}
            setInputValue={setInputValue3BF}
            selectedItem={selectedItem3BF}
            setSelectedItem={setSelectedItem3BF}
            placeholder='Select Drink'
            customBgColor='#222323'
          />
        </Box>
      </Box>

      {/* Note Section */}
      <Typography
        sx={{
          width: '100%',
          bgcolor: '#323434',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px',
          fontSize: '0.9rem',
        }}
      >
        Note
      </Typography>
      <TextField
        multiline
        maxRows={4}
        inputProps={{
          maxLength: 150,
          style: {
            fontSize: '0.9rem', // 👈 Set input font size
            paddingLeft: '8px', // 👈 Add left padding
            paddingRight: '8px', // 👈 Add right padding
          },
        }}
        placeholder='Write a note regarding this build'
        value={note}
        onChange={(e) => setNote(e.target.value)}
        fullWidth
        variant='standard'
        InputProps={{
          style: {
            color: '#ffffff', // White text
          },
          disableUnderline: false,
          classes: {
            underline: 'no-underline', // optional: style via class
          },
        }}
        sx={{
          '& .MuiInput-underline:before': {
            borderBottomColor: 'transparent',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#1976d2', // Blue on hover (MUI primary blue)
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#1976d2', // Blue on focus
          },
        }}
      />
      <Typography
        variant='caption'
        sx={{ color: '#aaa', textAlign: 'right', display: 'block', mb: 2 }}
      >
        <Box
          sx={{
            textAlign: 'right',
            fontSize: '0.75rem',
            color: '#ffffff',
            pr: 1,
          }}
        >
          {note.length}/150
        </Box>
      </Typography>
    </Box>
  );
});

export default Buff;
