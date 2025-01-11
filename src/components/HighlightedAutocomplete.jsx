import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const firstOptions = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Conflicting Memories',
];
const secondOptions = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange',
  'Black',
  'White',
];
const thirdOptions = [
  'Almond Milk',
  'Soy Milk Vanila Melted Caramel',
  'Oat Milk',
  'Cow Milk',
  'Coconut Milk',
  'Rice Milk',
  'Goat Milk',
];
const hideOptions = [
  'Cow',
  'Bear',
  'Wolf',
  'Alligator',
  'Fox',
  'Rawhide',
  'Wool',
];

const HighlightedAutocomplete = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [inputValue2, setInputValue2] = useState('');
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [inputValue3, setInputValue3] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue4, setInputValue4] = useState('');
  const [selectedItem4, setSelectedItem4] = useState([]);


  const handleAddItem = (item) => {
    if (selectedItems.length < 3 && !selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setInputValue3('');
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => (
      <span
        key={index}
        style={{
          fontWeight:
            part.toLowerCase() === highlight.toLowerCase() ? 'bold' : 'normal',
          color:
            part.toLowerCase() === highlight.toLowerCase()
              ? '#977d4c'
              : '#ffffff',
        }}
      >
        {part}
      </span>
    ));
  };

  const renderStandardAutocomplete = (
    options,
    inputValue,
    setInputValue,
    selectedItem,
    setSelectedItem,
    placeholder,
    customBgColor
  ) => (
    <Autocomplete
      options={options} // Always show the full list
      value={selectedItem || null}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, value) => setSelectedItem(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: customBgColor,
              color: '#ffffff',
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none',
              outline: 'none',
              height: '35px', // Reduced height by 20%
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': { color: '#ffffff', fontSize: '0.9rem' }, // Reduced font size by 20%
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: null,
          }}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            backgroundColor: props['aria-selected'] ? '#444' : '#222323', // Highlight selected item
            color: '#ffffff',
            fontSize: '0.9rem', // Reduced font size by 20%
            padding: '8px 12px', // Adjust padding for better UX
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333'; // Highlight on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = props['aria-selected']
              ? '#444'
              : '#222323'; // Reset background color
          }}
        >
          {getHighlightedText(option, inputValue)}
        </li>
      )}
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: '#222323',
            color: '#ffffff',
            border: 'none',
            boxShadow: 'none',
          }}
        />
      )}
    />
  );

  const renderCustomAutocomplete = (
    options,
    inputValue,
    setInputValue,
    placeholder,
    customBgColor
  ) => (
    <Autocomplete
      options={options.filter((option) => !selectedItems.includes(option))} // Exclude selected items
      inputValue={inputValue}
      value={null} // Always reset to null to show placeholder
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, value) => {
        if (value) handleAddItem(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: customBgColor,
              color: '#ffffff',
              border: 'none',
              borderRadius: 0,
              boxShadow: 'none',
              outline: 'none',
              height: '35px', // Reduced height by 20%
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': { color: '#ffffff', fontSize: '0.8rem' }, // Reduced font size by 20%
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: null,
          }}
        />
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            backgroundColor: '#222323',
            color: '#ffffff',
            fontSize: '0.8rem', // Reduced font size by 20%
          }}
        >
          {getHighlightedText(option, inputValue)}
        </li>
      )}
      PaperComponent={(props) => (
        <Box
          {...props}
          sx={{
            bgcolor: '#222323',
            color: '#ffffff',
            border: 'none',
            boxShadow: 'none',
          }}
        />
      )}
    />
  );

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
            height: '35px', // Reduced height by 20%
            fontSize: '0.9rem', // Reduced font size by 20%
          }}
        >
          <Typography sx={{ fontSize: '0.75rem' }}>Main Weapon</Typography>
        </Box>
        <Box sx={{ width: '75%' }}>
          {renderStandardAutocomplete(
            firstOptions,
            inputValue1,
            setInputValue1,
            selectedItem1,
            setSelectedItem1,
            'Select Weapon',
            '#222323'
          )}
        </Box>
      </Box>

      <Box sx={{ height: '4px', bgcolor: '#323434', marginBottom: 0 }} />

      {renderStandardAutocomplete(
        hideOptions,
        inputValue4,
        setInputValue4,
        selectedItem4,
        setSelectedItem4,
        'Hide',
        '#222323'
      )}

      

      <Box sx={{ height: '12px', bgcolor: '#977d4c', marginBottom: 0 }} />
      {renderStandardAutocomplete(
        secondOptions,
        inputValue2,
        setInputValue2,
        selectedItem2,
        setSelectedItem2,
        'Select a color',
        '#222323'
      )}
      {renderCustomAutocomplete(
        thirdOptions,
        inputValue3,
        setInputValue3,
        'Select milk type',
        '#323434'
      )}
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
              borderRadius: 0,
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              borderBottom:
                index < selectedItems.length - 1
                  ? '2px dashed #323434'
                  : 'none',
              paddingLeft: '12px', // Adjusted padding
              paddingRight: '12px', // Adjusted padding
              fontSize: '0.9rem', // Reduced font size by 20%
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
};

export default HighlightedAutocomplete;
