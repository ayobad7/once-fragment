import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  weaponOptions,
  wepmodOptions,
  effectOptions,
  styleOptions,
  stat1Options,
  stat2Options,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Weapon2 = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1W2, setInputValue1W2] = useState('');
  const [selectedItem1W2, setSelectedItem1W2] = useState(null);
  const [inputValue2W2, setInputValue2W2] = useState('');
  const [selectedItem2W2, setSelectedItem2W2] = useState(null);
  const [inputValue3W2, setInputValue3W2] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4W2, setInputValue4W2] = useState('');
  const [selectedItem4W2, setSelectedItem4W2] = useState(null);
  const [inputValue5W2, setInputValue5W2] = useState('');
  const [selectedItem5W2, setSelectedItem5W2] = useState(null);
  const [inputValue6W2, setInputValue6W2] = useState('');
  const [selectedItem6W2, setSelectedItem6W2] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1W2,
        selectedItem2W2,
        selectedItems,
        selectedItem4W2,
        selectedItem5W2,
        selectedItem6W2,
      });
    }
  }, [
    selectedItem1W2,
    selectedItem2W2,
    selectedItems,
    selectedItem4W2,
    selectedItem5W2,
    selectedItem6W2,
    onSave,
  ]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1W2(null);
      setSelectedItem2W2(null);
      setSelectedItems([]);
      setSelectedItem4W2(null);
      setSelectedItem5W2(null);
      setSelectedItem6W2(null);
    },
    saveData: () => ({
      selectedItem1W2,
      selectedItem2W2,
      selectedItems,
      selectedItem4W2,
      selectedItem5W2,
      selectedItem6W2,
    }),
    loadData: (data) => {
      setSelectedItem1W2(data?.selectedItem1W2 ?? '');
      setSelectedItem2W2(data?.selectedItem2W2 ?? '');
      setSelectedItems(data?.selectedItems ?? []);
      setSelectedItem4W2(data?.selectedItem4W2 ?? '');
      setSelectedItem5W2(data?.selectedItem5W2 ?? '');
      setSelectedItem6W2(data?.selectedItem6W2 ?? '');
    },
  }));

  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3W2('');
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
          <Typography sx={{ fontSize: '0.75rem' }}>Secondary Weapon</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          <StandardAutocomplete
            options={weaponOptions}
            inputValue={inputValue1W2}
            setInputValue={setInputValue1W2}
            selectedItem={selectedItem1W2}
            setSelectedItem={setSelectedItem1W2}
            placeholder='Select Weapon'
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
          borderBottom: '2px dashed #323434',
        }}
      >
        <Box
          sx={{
            width: '15%',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            fontSize: '0.9rem',
          }}
        >
          <Typography>+4</Typography>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={styleOptions}
            inputValue={inputValue4W2}
            setInputValue={setInputValue4W2}
            selectedItem={selectedItem4W2}
            setSelectedItem={setSelectedItem4W2}
            placeholder='Calibration Style'
            customBgColor='#222323'
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          marginBottom: 0,
          borderBottom: '2px dashed #323434',
        }}
      >
        <Box
          sx={{
            width: '15%',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            fontSize: '0.9rem',
          }}
        >
          <Typography>+7</Typography>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={stat1Options}
            inputValue={inputValue5W2}
            setInputValue={setInputValue5W2}
            selectedItem={selectedItem5W2}
            setSelectedItem={setSelectedItem5W2}
            placeholder='Calibration Stat'
            customBgColor='#222323'
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box
          sx={{
            width: '15%',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
            fontSize: '0.9rem',
          }}
        >
          <Typography>+10</Typography>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={stat2Options}
            inputValue={inputValue6W2}
            setInputValue={setInputValue6W2}
            selectedItem={selectedItem6W2}
            setSelectedItem={setSelectedItem6W2}
            placeholder='Calibration Stat'
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
        options={wepmodOptions}
        inputValue={inputValue2W2}
        setInputValue={setInputValue2W2}
        selectedItem={selectedItem2W2}
        setSelectedItem={setSelectedItem2W2}
        placeholder='Select Core Effect'
        customBgColor='#222323'
        groupByCategory={true}
      />
      <CustomAutocomplete
        options={effectOptions}
        inputValue={inputValue3W2}
        setInputValue={setInputValue3W2}
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

export default Weapon2;
