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
  helmetOptions,
  hmodOptions,
  hideOptions,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Helmet = forwardRef(
  (
    { onSave, onLoad, copiedAttributeEffects, setCopiedAttributeEffects },
    ref
  ) => {
    const [inputValue1H, setInputValue1H] = useState('');
    const [selectedItem1H, setSelectedItem1H] = useState(null);
    const [inputValue2H, setInputValue2H] = useState('');
    const [selectedItem2H, setSelectedItem2H] = useState(null);
    const [inputValue3H, setInputValue3H] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue4H, setInputValue4H] = useState('');
    const [selectedItem4H, setSelectedItem4H] = useState(null);

    // Save current state whenever relevant changes occur
    useEffect(() => {
      if (onSave) {
        onSave({
          selectedItem1H,
          selectedItem2H,
          selectedItems,
          selectedItem4H,
        });
      }
    }, [selectedItem1H, selectedItem2H, selectedItems, selectedItem4H, onSave]);

    // Expose functionality through the `ref`
    React.useImperativeHandle(ref, () => ({
      resetState: () => {
        setSelectedItem1H(null);
        setSelectedItem2H(null);
        setSelectedItems([]);
        setSelectedItem4H(null);
      },
      saveData: () => ({
        selectedItem1H,
        selectedItem2H,
        selectedItems,
        selectedItem4H,
      }),
      loadData: (data) => {
        setSelectedItem1H(data?.selectedItem1H ?? '');
        setSelectedItem2H(data?.selectedItem2H ?? '');
        setSelectedItems(data?.selectedItems ?? []);
        setSelectedItem4H(data?.selectedItem4H ?? '');
      },
    }));

    const handleAddItem = (item) => {
      if (selectedItems.length < 3 && !selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
        setInputValue3H('');
      }
    };

    const handleRemoveItem = (item) => {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    };

    const handleCopy = () => {
      setCopiedAttributeEffects([...selectedItems]);
    };

    const handlePaste = () => {
      if (copiedAttributeEffects && copiedAttributeEffects.length > 0) {
        const newItems = [...selectedItems];
        copiedAttributeEffects.forEach((item) => {
          if (newItems.length < 3 && !newItems.includes(item)) {
            newItems.push(item);
          }
        });
        setSelectedItems(newItems);
      }
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
            <Typography sx={{ fontSize: '0.9rem' }}>Helmet</Typography>
          </Box>
          <Box sx={{ width: '75%' }}>
            <StandardAutocomplete
              options={helmetOptions}
              inputValue={inputValue1H}
              setInputValue={setInputValue1H}
              selectedItem={selectedItem1H}
              setSelectedItem={setSelectedItem1H}
              placeholder='Select Helmet'
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
              inputValue={inputValue4H}
              setInputValue={setInputValue4H}
              selectedItem={selectedItem4H}
              setSelectedItem={setSelectedItem4H}
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
          options={hmodOptions}
          inputValue={inputValue2H}
          setInputValue={setInputValue2H}
          selectedItem={selectedItem2H}
          setSelectedItem={setSelectedItem2H}
          placeholder='Select Core Effect'
          customBgColor='#222323'
          groupByCategory={true}
        />
        <CustomAutocomplete
          options={effectOptions}
          inputValue={inputValue3H}
          setInputValue={setInputValue3H}
          selectedItems={selectedItems}
          handleAddItem={handleAddItem}
          placeholder='Attribute Effects'
          customBgColor='#323434'
          onCopy={handleCopy}
          onPaste={handlePaste}
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
  }
);

export default Helmet;
