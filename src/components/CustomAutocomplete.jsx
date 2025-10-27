import React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const CustomAutocomplete = ({
  options,
  inputValue,
  setInputValue,
  placeholder,
  customBgColor,
  handleAddItem,
  selectedItems,
  onCopy,
  onPaste,
}) => {
  // Function to highlight the matching text
  const getHighlightedText = (text = '', highlight = '') => {
    if (!highlight) return text; // Return the full text if no highlight is provided

    const safeText = String(text); // Ensure the input is a string
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
          whiteSpace: 'pre', // Preserve spaces
        }}
      >
        {part}
      </span>
    ));
  };

  return (
    <Box sx={{ position: 'relative' }}>
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
      {/* Copy and Paste Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '8px',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: 0.5,
        }}
      >
        <Tooltip title='Copy Attribute Effects' arrow>
          <IconButton
            onClick={onCopy}
            sx={{
              color: '#ffffff',
              padding: '4px',
              '&:hover': {
                color: '#977d4c',
                backgroundColor: 'transparent',
              },
            }}
            size='small'
          >
            <ContentCopyIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Paste Attribute Effects' arrow>
          <IconButton
            onClick={onPaste}
            sx={{
              color: '#ffffff',
              padding: '4px',
              '&:hover': {
                color: '#977d4c',
                backgroundColor: 'transparent',
              },
            }}
            size='small'
          >
            <ContentPasteIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CustomAutocomplete;
