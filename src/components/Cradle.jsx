import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Box, Typography, } from '@mui/material';
import { cradleOptions, } from './options'; // Import the constants
import StandardAutocomplete from './StandardAutocomplete';

const Cradle = forwardRef(({ onSave, onLoad }, ref) => {
  const [inputValue1C, setInputValue1C] = useState('');
  const [selectedItem1C, setSelectedItem1C] = useState(null);
  const [inputValue2C, setInputValue2C] = useState('');
  const [selectedItem2C, setSelectedItem2C] = useState(null);
  const [inputValue3C, setInputValue3C] = useState('');
  const [selectedItem3C, setSelectedItem3C] = useState(null);
  const [inputValue4C, setInputValue4C] = useState('');
  const [selectedItem4C, setSelectedItem4C] = useState(null);
  const [inputValue5C, setInputValue5C] = useState('');
  const [selectedItem5C, setSelectedItem5C] = useState(null);
  const [inputValue6C, setInputValue6C] = useState('');
  const [selectedItem6C, setSelectedItem6C] = useState(null);
  const [inputValue7C, setInputValue7C] = useState('');
  const [selectedItem7C, setSelectedItem7C] = useState(null);
  const [inputValue8C, setInputValue8C] = useState('');
  const [selectedItem8C, setSelectedItem8C] = useState(null);

  // Save current state whenever relevant changes occur
  useEffect(() => {
    if (onSave) {
      onSave({
        selectedItem1C,
        selectedItem2C,
        selectedItem3C,
        selectedItem4C,
        selectedItem5C,
        selectedItem6C,
        selectedItem7C,
        selectedItem8C,
      });
    }
  }, [
    selectedItem1C,
    selectedItem2C,
    selectedItem3C,
    selectedItem4C,
    selectedItem5C,
    selectedItem6C,
    selectedItem7C,
    selectedItem8C,
    onSave,
  ]);

  // Expose functionality through the `ref`
  React.useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelectedItem1C(null);
      setSelectedItem2C(null);
      setSelectedItem3C(null);
      setSelectedItem4C(null);
      setSelectedItem5C(null);
      setSelectedItem6C(null);
      setSelectedItem7C(null);
      setSelectedItem8C(null);
    },
    saveData: () => ({
      selectedItem1C,
      selectedItem2C,
      selectedItem3C,
      selectedItem4C,
      selectedItem5C,
      selectedItem6C,
      selectedItem7C,
      selectedItem8C,
    }),
    loadData: (data) => {
      setSelectedItem1C(data?.selectedItem1C ?? '');
      setSelectedItem2C(data?.selectedItem2C ?? '');
      setSelectedItem3C(data?.selectedItem3C ?? '');
      setSelectedItem4C(data?.selectedItem4C ?? '');
      setSelectedItem5C(data?.selectedItem5C ?? '');
      setSelectedItem6C(data?.selectedItem6C ?? '');
      setSelectedItem7C(data?.selectedItem7C ?? '');
      setSelectedItem8C(data?.selectedItem8C ?? '');
    },
  }));

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', bgcolor: '#222323' }}>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 0 }}>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#323434',
            color: '#ffffff',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35px',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem' }}>Cradle Overide</Typography>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            1
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue1C}
            setInputValue={setInputValue1C}
            selectedItem={selectedItem1C}
            setSelectedItem={setSelectedItem1C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            2
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue2C}
            setInputValue={setInputValue2C}
            selectedItem={selectedItem2C}
            setSelectedItem={setSelectedItem2C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            3
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue3C}
            setInputValue={setInputValue3C}
            selectedItem={selectedItem3C}
            setSelectedItem={setSelectedItem3C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            4
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue4C}
            setInputValue={setInputValue4C}
            selectedItem={selectedItem4C}
            setSelectedItem={setSelectedItem4C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            5
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue5C}
            setInputValue={setInputValue5C}
            selectedItem={selectedItem5C}
            setSelectedItem={setSelectedItem5C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            6
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue6C}
            setInputValue={setInputValue6C}
            selectedItem={selectedItem6C}
            setSelectedItem={setSelectedItem6C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            7
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue7C}
            setInputValue={setInputValue7C}
            selectedItem={selectedItem7C}
            setSelectedItem={setSelectedItem7C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', // Smaller font size
            }}
          >
            8
          </Box>
        </Box>
        <Box sx={{ width: '85%' }}>
          <StandardAutocomplete
            options={cradleOptions}
            inputValue={inputValue8C}
            setInputValue={setInputValue8C}
            selectedItem={selectedItem8C}
            setSelectedItem={setSelectedItem8C}
            placeholder='Select Cradle'
            customBgColor='#222323'
            groupByCategory={true}
          />
        </Box>
      </Box>
    </Box>
  );
});

export default Cradle;
