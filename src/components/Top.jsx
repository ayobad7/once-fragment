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
  topOptions,
  tmodOptions,
  hideOptions,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Top = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1T, setInputValue1T] = useState('');
  const [selectedItem1T, setSelectedItem1T] = useState(null);
  const [inputValue2T, setInputValue2T] = useState('');
  const [selectedItem2T, setSelectedItem2T] = useState(null);
  const [inputValue3T, setInputValue3T] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4T, setInputValue4T] = useState('');
  const [selectedItem4T, setSelectedItem4T] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1T,
        selectedItem2T,
        selectedItems,
        selectedItem4T,
      });
    }
  }, [selectedItem1T, selectedItem2T, selectedItems, selectedItem4T, onSave]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1T(null);
      setSelectedItem2T(null);
      setSelectedItems([]);
      setSelectedItem4T(null);
    },
    saveData: () => ({
      selectedItem1T,
      selectedItem2T,
      selectedItems,
      selectedItem4T,
    }),
    loadData: (data) => {
      setSelectedItem1T(data?.selectedItem1T ?? '');
      setSelectedItem2T(data?.selectedItem2T ?? '');
      setSelectedItems(data?.selectedItems ?? []);
      setSelectedItem4T(data?.selectedItem4T ?? '');
    },
  }));

  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3T('');
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
          <Typography sx={{ fontSize: '0.9rem' }}>Top</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          <StandardAutocomplete
            options={topOptions}
            inputValue={inputValue1T}
            setInputValue={setInputValue1T}
            selectedItem={selectedItem1T}
            setSelectedItem={setSelectedItem1T}
            placeholder='Select Top'
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
            inputValue={inputValue4T}
            setInputValue={setInputValue4T}
            selectedItem={selectedItem4T}
            setSelectedItem={setSelectedItem4T}
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
        options={tmodOptions}
        inputValue={inputValue2T}
        setInputValue={setInputValue2T}
        selectedItem={selectedItem2T}
        setSelectedItem={setSelectedItem2T}
        placeholder='Select Core Effect'
        customBgColor='#222323'
        groupByCategory={true}
      />
      <CustomAutocomplete
        options={effectOptions}
        inputValue={inputValue3T}
        setInputValue={setInputValue3T}
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

export default Top;
