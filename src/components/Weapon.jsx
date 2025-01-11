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

const Weapon = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1W, setInputValue1W] = useState('');
  const [selectedItem1W, setSelectedItem1W] = useState(null);
  const [inputValue2W, setInputValue2W] = useState('');
  const [selectedItem2W, setSelectedItem2W] = useState(null);
  const [inputValue3W, setInputValue3W] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4W, setInputValue4W] = useState('');
  const [selectedItem4W, setSelectedItem4W] = useState(null);
  const [inputValue5W, setInputValue5W] = useState('');
  const [selectedItem5W, setSelectedItem5W] = useState(null);
  const [inputValue6W, setInputValue6W] = useState('');
  const [selectedItem6W, setSelectedItem6W] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1W,
        selectedItem2W,
        selectedItems,
        selectedItem4W,
        selectedItem5W,
        selectedItem6W,
      });
    }
  }, [
    selectedItem1W,
    selectedItem2W,
    selectedItems,
    selectedItem4W,
    selectedItem5W,
    selectedItem6W,
    onSave,
  ]);

  // Expose functionality through the `ref`
React.useImperativeHandle(ref, () => ({
  resetState: () => {
    setSelectedItem1W(null);
    setSelectedItem2W(null);
    setSelectedItems([]);
    setSelectedItem4W(null);
    setSelectedItem5W(null);
    setSelectedItem6W(null);
  },
  saveData: () => ({
    selectedItem1W,
    selectedItem2W,
    selectedItems,
    selectedItem4W,
    selectedItem5W,
    selectedItem6W,
  }),
  loadData: (data) => {
    setSelectedItem1W(data?.selectedItem1W ?? '');
    setSelectedItem2W(data?.selectedItem2W ?? '');
    setSelectedItems(data?.selectedItems ?? []);
    setSelectedItem4W(data?.selectedItem4W ?? '');
    setSelectedItem5W(data?.selectedItem5W ?? '');
    setSelectedItem6W(data?.selectedItem6W ?? '');
  },
}));

  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3W('');
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
          <Typography sx={{ fontSize: '0.75rem' }}>Primary Weapon</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          <StandardAutocomplete
            options={weaponOptions}
            inputValue={inputValue1W}
            setInputValue={setInputValue1W}
            selectedItem={selectedItem1W}
            setSelectedItem={setSelectedItem1W}
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
            inputValue={inputValue4W}
            setInputValue={setInputValue4W}
            selectedItem={selectedItem4W}
            setSelectedItem={setSelectedItem4W}
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
            inputValue={inputValue5W}
            setInputValue={setInputValue5W}
            selectedItem={selectedItem5W}
            setSelectedItem={setSelectedItem5W}
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
            inputValue={inputValue6W}
            setInputValue={setInputValue6W}
            selectedItem={selectedItem6W}
            setSelectedItem={setSelectedItem6W}
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
        inputValue={inputValue2W}
        setInputValue={setInputValue2W}
        selectedItem={selectedItem2W}
        setSelectedItem={setSelectedItem2W}
        placeholder='Select Core Effect'
        customBgColor='#222323'
        groupByCategory={true}
      />
      <CustomAutocomplete
        options={effectOptions}
        inputValue={inputValue3W}
        setInputValue={setInputValue3W}
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

export default Weapon;
