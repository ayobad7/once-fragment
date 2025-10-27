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
  shoesOptions,
  smodOptions,
  hideOptions,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Shoes = forwardRef(
  (
    { onSave, onLoad, copiedAttributeEffects, setCopiedAttributeEffects },
    ref
  ) => {
    const [inputValue1S, setInputValue1S] = useState('');
    const [selectedItem1S, setSelectedItem1S] = useState(null);
    const [inputValue2S, setInputValue2S] = useState('');
    const [selectedItem2S, setSelectedItem2S] = useState(null);
    const [inputValue3S, setInputValue3S] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue4S, setInputValue4S] = useState('');
    const [selectedItem4S, setSelectedItem4S] = useState(null);

    // Save current state whenever relevant changes occur
    useEffect(() => {
      if (onSave) {
        onSave({
          selectedItem1S,
          selectedItem2S,
          selectedItems,
          selectedItem4S,
        });
      }
    }, [selectedItem1S, selectedItem2S, selectedItems, selectedItem4S, onSave]);

    // Expose functionality through the `ref`
    React.useImperativeHandle(ref, () => ({
      resetState: () => {
        setSelectedItem1S(null);
        setSelectedItem2S(null);
        setSelectedItems([]);
        setSelectedItem4S(null);
      },
      saveData: () => ({
        selectedItem1S,
        selectedItem2S,
        selectedItems,
        selectedItem4S,
      }),
      loadData: (data) => {
        setSelectedItem1S(data?.selectedItem1S ?? '');
        setSelectedItem2S(data?.selectedItem2S ?? '');
        setSelectedItems(data?.selectedItems ?? []);
        setSelectedItem4S(data?.selectedItem4S ?? '');
      },
    }));

    const handleAddItem = (item) => {
      if (selectedItems.length < 3 && !selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
        setInputValue3S('');
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
            <Typography sx={{ fontSize: '0.9rem' }}>Shoes</Typography>
          </Box>
          <Box sx={{ width: '75%' }}>
            <StandardAutocomplete
              options={shoesOptions}
              inputValue={inputValue1S}
              setInputValue={setInputValue1S}
              selectedItem={selectedItem1S}
              setSelectedItem={setSelectedItem1S}
              placeholder='Select Shoes'
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
              inputValue={inputValue4S}
              setInputValue={setInputValue4S}
              selectedItem={selectedItem4S}
              setSelectedItem={setSelectedItem4S}
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
          options={smodOptions}
          inputValue={inputValue2S}
          setInputValue={setInputValue2S}
          selectedItem={selectedItem2S}
          setSelectedItem={setSelectedItem2S}
          placeholder='Select Core Effect'
          customBgColor='#222323'
          groupByCategory={true}
        />
        <CustomAutocomplete
          options={effectOptions}
          inputValue={inputValue3S}
          setInputValue={setInputValue3S}
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

export default Shoes;
