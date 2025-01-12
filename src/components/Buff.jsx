import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { DevOptions, FoodOptions, DrinkOptions, } from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';

const Buff = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1BF, setInputValue1BF] = useState('');
  const [selectedItem1BF, setSelectedItem1BF] = useState(null);
  const [inputValue2BF, setInputValue2BF] = useState('');
  const [selectedItem2BF, setSelectedItem2BF] = useState(null);
  const [inputValue3BF, setInputValue3BF] = useState('');
  const [selectedItem3BF, setSelectedItem3BF] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1BF,
        selectedItem2BF,
        selectedItem3BF,
      });
    }
  }, [
    selectedItem1BF,
    selectedItem2BF,
    selectedItem3BF,
    onSave,
  ]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1BF(null);
      setSelectedItem2BF(null);
      setSelectedItem3BF(null);
    },
    saveData: () => ({
      selectedItem1BF,
      selectedItem2BF,
      selectedItem3BF,
    }),
    loadData: (data) => {
      setSelectedItem1BF(data?.selectedItem1BF ?? '');
      setSelectedItem2BF(data?.selectedItem2BF ?? '');
      setSelectedItem3BF(data?.selectedItem3BF ?? '');
    },
  }));

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', bgcolor: '#222323' }}>
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

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginBottom: 0,
        }}
      >
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
      <Box
        sx={{
          width: '100%',
          bgcolor: '#323434',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px', // Reduced height by 20%
          fontSize: '0.9rem', // Reduced font size by 20%
        }}
      >
        <Typography sx={{ fontSize: '0.9rem' }}>Food Buff</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginBottom: 0,
        }}
      >
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
      <Box
        sx={{
          width: '100%',
          bgcolor: '#323434',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '35px', // Reduced height by 20%
          fontSize: '0.9rem', // Reduced font size by 20%
        }}
      >
        <Typography sx={{ fontSize: '0.9rem' }}>Drink Buff</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginBottom: 0,
        }}
      >
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
    </Box>
  );
});

export default Buff;
