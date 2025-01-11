import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

const CustomAutocomplete = ({
  options,
  inputValue,
  setInputValue,
  placeholder,
  customBgColor,
  handleAddItem,
  selectedItems,
}) => {
  // Function to highlight the matching text
  const getHighlightedText = (text = '', highlight) => {
    const safeText = String(text); // Ensure text is a string
    const parts = safeText.split(new RegExp(`(${highlight})`, 'gi'));
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

  return (
    <Autocomplete
      options={options.filter((option) => !selectedItems.includes(option))}
      inputValue={inputValue}
      value={null}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, value) => {
        if (value) handleAddItem(value);
      }}
      noOptionsText={
        <Box sx={{ color: 'red', textAlign: 'Left', fontSize: '0.9rem' }}>
          No Result
        </Box>
      }
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
              height: '35px',
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-input': { color: '#ffffff', fontSize: '0.9rem' },
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: null,
          }}
        />
      )}
      renderOption={(props, option) => {
        const optionText =
          typeof option === 'string' ? option : String(option || '');
        return (
          <li
            {...props}
            style={{
              backgroundColor: '#222323',
              color: '#ffffff',
              fontSize: '0.9rem',
            }}
          >
            {getHighlightedText(optionText, inputValue)}
          </li>
        );
      }}
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
};

export default CustomAutocomplete;
