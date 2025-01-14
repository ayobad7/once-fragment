import React, { useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share'; // Import Share Icon
import html2canvas from 'html2canvas'; // Import the library
import { toPng } from 'html-to-image';
import Weapon from './components/Weapon';
import Weapon2 from './components/Weapon2';
import Helmet from './components/Helmet';
import Face from './components/Face';
import Top from './components/Top';
import Bottoms from './components/Bottoms';
import Shoes from './components/Shoes';
import Gloves from './components/Gloves';
import Cradle from './components/Cradle';
import Buff from './components/Buff';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Modal,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import '@fontsource/figtree';

const theme = createTheme({
  typography: {
    fontFamily: 'Figtree, sans-serif',
  },
});

function App() {
  const [savedFiles, setSavedFiles] = useState(() => {
    const files = localStorage.getItem('savedFiles');
    return files ? JSON.parse(files) : {};
  });

  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [isLoadModalOpen, setLoadModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const weaponRef = useRef();
  const weapon2Ref = useRef();
  const cradleRef = useRef();
  const buffRef = useRef();
  const helmetRef = useRef();
  const faceRef = useRef();
  const glovesRef = useRef();
  const topRef = useRef();
  const bottomsRef = useRef();
  const shoesRef = useRef();

  const handleSave = () => {
    if (fileName.trim() === '') return alert('File name cannot be empty.');

    const data = {
      weaponData: weaponRef.current?.saveData(),
      weapon2Data: weapon2Ref.current?.saveData(),
      cradleData: cradleRef.current?.saveData(),
      buffData: buffRef.current?.saveData(),
      helmetData: helmetRef.current?.saveData(),
      faceData: faceRef.current?.saveData(),
      glovesData: glovesRef.current?.saveData(),
      topData: topRef.current?.saveData(),
      bottomsData: bottomsRef.current?.saveData(),
      shoesData: shoesRef.current?.saveData(),
    };

    const updatedFiles = { ...savedFiles, [fileName]: data };
    localStorage.setItem('savedFiles', JSON.stringify(updatedFiles));
    setSavedFiles(updatedFiles);
    setSaveModalOpen(false);
    setFileName('');
  };

  const handleLoad = (selectedFile) => {
    const {
      weaponData,
      weapon2Data,
      cradleData,
      buffData,
      helmetData,
      faceData,
      glovesData,
      topData,
      bottomsData,
      shoesData,
    } = savedFiles[selectedFile];
    weaponRef.current?.loadData(weaponData);
    weapon2Ref.current?.loadData(weapon2Data);
    cradleRef.current?.loadData(cradleData);
    buffRef.current?.loadData(buffData);
    helmetRef.current?.loadData(helmetData);
    faceRef.current?.loadData(faceData);
    glovesRef.current?.loadData(glovesData);
    topRef.current?.loadData(topData);
    bottomsRef.current?.loadData(bottomsData);
    shoesRef.current?.loadData(shoesData);
    setLoadModalOpen(false);
  };

const handleSnap = async () => {
  try {
    const node = document.querySelector('#content-area'); // Adjust the selector to target the area to capture
    const dataUrl = await toPng(node);

    // Create a download link and trigger download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'screenshot.png';
    link.click();
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
  }
};

const [fileUrls, setFileUrls] = useState({}); // Store generated URLs

const handleShare = (fileName) => {
  // Check if a URL is already generated
  if (!fileUrls[fileName]) {
    const url = `${window.location.origin}/load?file=${encodeURIComponent(
      fileName
    )}`;
    setFileUrls((prev) => ({ ...prev, [fileName]: url }));
    navigator.clipboard.writeText(url);
    alert(`URL copied to clipboard: ${url}`);
  } else {
    navigator.clipboard.writeText(fileUrls[fileName]);
    alert(`URL copied to clipboard: ${fileUrls[fileName]}`);
  }
};

  return (
    <Box id='content-area'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            textAlign: 'center',
            padding: 2,
            bgcolor: '#252a2b',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Save and Load Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Button
              variant='contained'
              onClick={() => setSaveModalOpen(true)}
              sx={{
                borderRadius: 0, // Remove rounded corners
                width: '120px', // Fixed width for the button
                boxShadow: 'none', // Remove shadow
                backgroundColor: '#06dbc7', // Custom background color
                fontWeight: 'bold',
                color: 'black', // Text color
                '&:hover': {
                  backgroundColor: '#127a72', // Slightly darker color on hover
                },
              }}
            >
              Save
            </Button>
            <Button
              variant='contained'
              onClick={() => setLoadModalOpen(true)}
              sx={{
                borderRadius: 0, // Remove rounded corners
                width: '120px', // Fixed width for the button
                boxShadow: 'none', // Remove shadow
                backgroundColor: '#1b4e47', // Custom background color
                fontWeight: 'bold',
                color: '#06dbc7', // Text color
                '&:hover': {
                  backgroundColor: '#1e3230', // Slightly darker color on hover
                },
              }}
            >
              Load
            </Button>
            <Button
              variant='contained'
              onClick={handleSnap}
              sx={{
                borderRadius: 0,
                border: '1px solid #06dbc7',
                width: '120px',
                boxShadow: 'none',
                backgroundColor: '#252a2b',
                fontWeight: 'bold',
                color: '#06dbc7',
                '&:hover': {
                  backgroundColor: '#1f1f1f',
                },
              }}
            >
              Snap
            </Button>
          </Box>

          <Modal open={isSaveModalOpen} onClose={() => setSaveModalOpen(false)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#131414', // Dark background
                color: 'white', // White text
                boxShadow: 24,
                p: 4,
                borderRadius: 0, // No rounded corners
                textAlign: 'center',
                width: '300px',
              }}
            >
              <Typography variant='h6' marginBottom={2}>
                Save Build
              </Typography>
              <TextField
                label='File Name'
                variant='outlined'
                fullWidth
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                InputLabelProps={{ style: { color: '#888' } }} // Light gray label
                InputProps={{
                  style: {
                    color: 'white',
                    backgroundColor: '#1e1e1e',
                    borderRadius: 0,
                  }, // No rounded corners for input
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSave}
                  sx={{
                    color: '#47b7a0',
                    backgroundColor: '#15332c',
                    borderRadius: 0, // No rounded corners
                    border: '1px solid #4cbda4',
                    '&:hover': { backgroundColor: '#255f53' },
                  }}
                >
                  Save
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => setSaveModalOpen(false)}
                  sx={{
                    borderColor: '#888',
                    color: '#888',
                    borderRadius: 0, // No rounded corners
                    '&:hover': {
                      borderColor: 'white',
                      color: 'white',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Load Modal */}
          <Modal open={isLoadModalOpen} onClose={() => setLoadModalOpen(false)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#131414',
                color: 'white',
                boxShadow: 24,
                p: 4,
                borderRadius: 0,
                textAlign: 'center',
                width: '300px',
              }}
            >
              <Typography variant='h6' marginBottom={2}>
                Load Builds
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.keys(savedFiles).map((name) => (
                  <Box
                    key={name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #4cbda4',
                      borderRadius: 0,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Share Button */}
                    <Button
                      onClick={() => handleShare(name)}
                      sx={{
                        minWidth: '40px',
                        padding: 0,
                        backgroundColor: '',
                        '&:hover': { backgroundColor: '#1e3c36' },
                        color: '#06dbc7',
                      }}
                    >
                      <ShareIcon />
                    </Button>

                    {/* File Name Button */}
                    <Button
                      onClick={() => handleLoad(name)}
                      sx={{
                        flex: 1,
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        color: '#47b7a0',
                        background: '#15332c',
                        boxShadow: 'none',
                        borderRadius: 0,
                        padding: '8px 16px',
                        '&:hover': { backgroundColor: '#255f53' },
                      }}
                    >
                      {name}
                    </Button>

                    {/* Delete Button */}
                    <Button
                      onClick={() => {
                        const updatedFiles = { ...savedFiles };
                        delete updatedFiles[name];
                        setSavedFiles(updatedFiles);
                        localStorage.setItem(
                          'savedFiles',
                          JSON.stringify(updatedFiles)
                        );
                      }}
                      sx={{
                        minWidth: '40px',
                        padding: 0,
                        backgroundColor: '',
                        '&:hover': { backgroundColor: '#4a1212' },
                        color: 'white',
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          </Modal>
          {/* Your Components */}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 2,
              flexWrap: 'nowrap',
              '& > *': {
                width: 300,
                minWidth: 300,
                height: 'auto',
              },
              maxWidth: '1300px',
              margin: '0 auto',
              '@media (max-width: 1200px)': {
                flexWrap: 'wrap',
              },
              '@media (max-width: 600px)': {
                flexDirection: 'column',
                maxWidth: '100%',
              },
            }}
          >
            <Weapon ref={weaponRef} />
            <Weapon2 ref={weapon2Ref} />
            <Cradle ref={cradleRef} />
            <Buff ref={buffRef} />
          </Box>

          {/* Second Row: Helmet, Face, and Gloves */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 2,
              flexWrap: 'nowrap',
              '& > *': {
                width: 300,
                minWidth: 300,
                height: 'auto',
              },
              maxWidth: '900px',
              margin: '0 auto',
              '@media (max-width: 900px)': {
                flexWrap: 'wrap',
              },
              '@media (max-width: 600px)': {
                flexDirection: 'column',
                maxWidth: '100%',
              },
            }}
          >
            <Helmet ref={helmetRef} />
            <Face ref={faceRef} />
            <Gloves ref={glovesRef} />
          </Box>

          {/* Third Row: Top, Bottoms, and Shoes */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 2,
              flexWrap: 'nowrap',
              '& > *': {
                width: 300,
                minWidth: 300,
                height: 'auto',
              },
              maxWidth: '900px',
              margin: '0 auto',
              '@media (max-width: 900px)': {
                flexWrap: 'wrap',
              },
              '@media (max-width: 600px)': {
                flexDirection: 'column',
                maxWidth: '100%',
              },
            }}
          >
            <Top ref={topRef} />
            <Bottoms ref={bottomsRef} />
            <Shoes ref={shoesRef} />
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
