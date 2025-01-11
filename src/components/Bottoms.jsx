import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { effectOptions, bottomsOptions, bmodOptions, hideOptions } from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Bottoms = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1B, setInputValue1B] = useState('');
  const [selectedItem1B, setSelectedItem1B] = useState(null);
  const [inputValue2B, setInputValue2B] = useState('');
  const [selectedItem2B, setSelectedItem2B] = useState(null);
  const [inputValue3B, setInputValue3B] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4B, setInputValue4B] = useState('');
  const [selectedItem4B, setSelectedItem4B] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1B,
        selectedItem2B,
        selectedItems,
        selectedItem4B,
      });
    }
  }, [selectedItem1B, selectedItem2B, selectedItems, selectedItem4B, onSave]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1B(null);
      setSelectedItem2B(null);
      setSelectedItems([]);
      setSelectedItem4B(null);
    },
    saveData: () => ({
      selectedItem1B,
      selectedItem2B,
      selectedItems,
      selectedItem4B,
    }),
    loadData: (data) => {
      setSelectedItem1B(data?.selectedItem1B ?? '');
      setSelectedItem2B(data?.selectedItem2B ?? '');
      setSelectedItems(data?.selectedItems ?? []);
      setSelectedItem4B(data?.selectedItem4B ?? '');
    },
  }));

  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3B('');
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', bgcolor: '#222323' }}>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box
          sx={{
            width: '25%',
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
          <Typography sx={{ fontSize: '0.9rem' }}>Bottoms</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          <StandardAutocomplete
            options={bottomsOptions}
            inputValue={inputValue1B}
            setInputValue={setInputValue1B}
            selectedItem={selectedItem1B}
            setSelectedItem={setSelectedItem1B}
            placeholder='Select Bottoms'
            customBgColor='#222323'
            groupByCategory={true}
          />
        </Box>
      </Box>
      <Box sx={{ height: '4px', bgcolor: '#323434', marginBottom: 0 }} />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginBottom: 0,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <StandardAutocomplete
            options={hideOptions}
            inputValue={inputValue4B}
            setInputValue={setInputValue4B}
            selectedItem={selectedItem4B}
            setSelectedItem={setSelectedItem4B}
            placeholder='Select Hide'
            customBgColor='#222323'
          />
        </Box>
      </Box>

      <Box
        sx={{
          height: '20px',
          bgcolor: '#977d4c',
          marginBottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: '0.9rem', color: 'black', fontWeight: 'bold' }}
        >
          MOD
        </Typography>
      </Box>
      <StandardAutocomplete
        options={bmodOptions}
        inputValue={inputValue2B}
        setInputValue={setInputValue2B}
        selectedItem={selectedItem2B}
        setSelectedItem={setSelectedItem2B}
        placeholder='Select Core Effect'
        customBgColor='#222323'
        groupByCategory={true}
      />
      <CustomAutocomplete
        options={effectOptions}
        inputValue={inputValue3B}
        setInputValue={setInputValue3B}
        selectedItems={selectedItems}
        handleAddItem={handleAddItem}
        placeholder='Attribute Effects'
        customBgColor='#323434'
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginTop: 1,
          bgcolor: '#222323',
        }}
      >
        {selectedItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#222323',
              color: '#ffffff',
              padding: '4px 8px',
              borderBottom:
                index < selectedItems.length - 1
                  ? '2px dashed #323434'
                  : 'none',
              '&:hover .close-icon': {
                opacity: 1,
                visibility: 'visible',
              },
            }}
          >
            <Typography sx={{ flexGrow: 1, fontSize: '0.9rem' }}>
              {item}
            </Typography>
            <IconButton
              size='small'
              onClick={() => handleRemoveItem(item)}
              className='close-icon'
              sx={{
                color: '#ffffff',
                padding: 0,
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity 0.2s ease, visibility 0.2s ease',
                '&:hover': { color: '#977d4c' },
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default Bottoms;
