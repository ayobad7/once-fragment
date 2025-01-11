import React from 'react';
import { Autocomplete, TextField, Typography, Box } from '@mui/material';

const StandardAutocomplete = ({
  options,
  inputValue,
  setInputValue,
  selectedItem,
  setSelectedItem,
  placeholder,
  customBgColor,
  groupByCategory = false,
}) => {
  // Function to highlight the matching text
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

  return (
    <Autocomplete
      options={options}
      groupBy={groupByCategory ? (option) => option.category : undefined}
      renderGroup={
        groupByCategory
          ? (params) => (
              <li key={params.key}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#977d4c',
                    padding: '4px 8px',
                  }}
                >
                  {params.group}
                </Typography>
                {params.children}
              </li>
            )
          : undefined
      }
      getOptionLabel={(option) =>
        option && typeof option === 'object' && option.title
          ? option.title
          : String(option || '')
      }
      filterOptions={(opts, state) =>
        opts.filter((option) =>
          (typeof option === 'string' ? option : option.title || option)
            .toLowerCase()
            .includes(state.inputValue.toLowerCase())
        )
      }
      value={selectedItem || null}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, value) => setSelectedItem(value)}
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
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            backgroundColor: props['aria-selected'] ? '#444' : '#222323',
            color: '#ffffff',
            fontSize: '0.9rem',
            padding: '8px 12px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = props['aria-selected']
              ? '#444'
              : '#222323';
          }}
        >
          {getHighlightedText(
            typeof option === 'string' ? option : option.title || option,
            inputValue
          )}
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
};

export default StandardAutocomplete;
