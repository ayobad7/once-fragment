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
  glovesOptions,
  gmodOptions,
  hideOptions,
} from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';
import CustomAutocomplete from './CustomAutocomplete';

const Gloves = forwardRef(
  (
    { onSave, onLoad, copiedAttributeEffects, setCopiedAttributeEffects },
    ref
  ) => {
    const [inputValue1G, setInputValue1G] = useState('');
    const [selectedItem1G, setSelectedItem1G] = useState(null);
    const [inputValue2G, setInputValue2G] = useState('');
    const [selectedItem2G, setSelectedItem2G] = useState(null);
    const [inputValue3G, setInputValue3G] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputValue4G, setInputValue4G] = useState('');
    const [selectedItem4G, setSelectedItem4G] = useState(null);

    // Save current state whenever relevant changes occur
    useEffect(() => {
      if (onSave) {
        onSave({
          selectedItem1G,
          selectedItem2G,
          selectedItems,
          selectedItem4G,
        });
      }
    }, [selectedItem1G, selectedItem2G, selectedItems, selectedItem4G, onSave]);

    // Expose functionality through the `ref`
    React.useImperativeHandle(ref, () => ({
      resetState: () => {
        setSelectedItem1G(null);
        setSelectedItem2G(null);
        setSelectedItems([]);
        setSelectedItem4G(null);
      },
      saveData: () => ({
        selectedItem1G,
        selectedItem2G,
        selectedItems,
        selectedItem4G,
      }),
      loadData: (data) => {
        setSelectedItem1G(data?.selectedItem1G ?? '');
        setSelectedItem2G(data?.selectedItem2G ?? '');
        setSelectedItems(data?.selectedItems ?? []);
        setSelectedItem4G(data?.selectedItem4G ?? '');
      },
    }));

    const handleAddItem = (item) => {
      if (selectedItems.length < 3 && !selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
        setInputValue3G('');
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
            <Typography sx={{ fontSize: '0.9rem' }}>Gloves</Typography>
          </Box>
          <Box sx={{ width: '75%' }}>
            <StandardAutocomplete
              options={glovesOptions}
              inputValue={inputValue1G}
              setInputValue={setInputValue1G}
              selectedItem={selectedItem1G}
              setSelectedItem={setSelectedItem1G}
              placeholder='Select Gloves'
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
              inputValue={inputValue4G}
              setInputValue={setInputValue4G}
              selectedItem={selectedItem4G}
              setSelectedItem={setSelectedItem4G}
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
          options={gmodOptions}
          inputValue={inputValue2G}
          setInputValue={setInputValue2G}
          selectedItem={selectedItem2G}
          setSelectedItem={setSelectedItem2G}
          placeholder='Select Core Effect'
          customBgColor='#222323'
          groupByCategory={true}
        />
        <CustomAutocomplete
          options={effectOptions}
          inputValue={inputValue3G}
          setInputValue={setInputValue3G}
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

export default Gloves;
