import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  effectOptions,
  faceOptions,
  fmodOptions,
  hideOptions,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Face = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1F, setInputValue1F] = useState('');
  const [selectedItem1F, setSelectedItem1F] = useState(null);
  const [inputValue2F, setInputValue2F] = useState('');
  const [selectedItem2F, setSelectedItem2F] = useState(null);
  const [inputValue3F, setInputValue3F] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4F, setInputValue4F] = useState('');
  const [selectedItem4F, setSelectedItem4F] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1F,
        selectedItem2F,
        selectedItems,
        selectedItem4F,
      });
    }
  }, [selectedItem1F, selectedItem2F, selectedItems, selectedItem4F, onSave]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1F(null);
      setSelectedItem2F(null);
      setSelectedItems([]);
      setSelectedItem4F(null);
    },
    saveData: () => ({
      selectedItem1F,
      selectedItem2F,
      selectedItems,
      selectedItem4F,
    }),
    loadData: (data) => {
      setSelectedItem1F(data?.selectedItem1F ?? '');
      setSelectedItem2F(data?.selectedItem2F ?? '');
      setSelectedItems(data?.selectedItems ?? []);
      setSelectedItem4F(data?.selectedItem4F ?? '');
    },
  }));

  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3F('');
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
          <Typography sx={{ fontSize: '0.9rem' }}>Face</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          <StandardAutocomplete
            options={faceOptions}
            inputValue={inputValue1F}
            setInputValue={setInputValue1F}
            selectedItem={selectedItem1F}
            setSelectedItem={setSelectedItem1F}
            placeholder='Select Face'
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
            inputValue={inputValue4F}
            setInputValue={setInputValue4F}
            selectedItem={selectedItem4F}
            setSelectedItem={setSelectedItem4F}
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
        options={fmodOptions}
        inputValue={inputValue2F}
        setInputValue={setInputValue2F}
        selectedItem={selectedItem2F}
        setSelectedItem={setSelectedItem2F}
        placeholder='Select Core Effect'
        customBgColor='#222323'
        groupByCategory={true}
      />
      <CustomAutocomplete
        options={effectOptions}
        inputValue={inputValue3F}
        setInputValue={setInputValue3F}
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

export default Face;
