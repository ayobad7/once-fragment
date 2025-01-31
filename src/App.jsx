import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install uuid library
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share'; // Import the share icon
import html2canvas from 'html2canvas'; // Import the library
import Timer from './Timer'; // Import Timer component
import { toPng } from 'html-to-image';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
  Drawer,
  IconButton,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '@fontsource/figtree';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa3bpn_-864NVUBoSxO7i7WXYCZ6ia29w",
  authDomain: "once-fragment.firebaseapp.com",
  projectId: "once-fragment",
  storageBucket: "once-fragment.firebasestorage.app",
  messagingSenderId: "472769682297",
  appId: "1:472769682297:web:a57d4dac5b2677d88e6da8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  const [fileUrls, setFileUrls] = useState(() => {
    const urls = localStorage.getItem('fileUrls');
    return urls ? JSON.parse(urls) : {};
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

useEffect(() => {
  const loadSharedFile = async () => {
    const sharedFileName = getQueryParam('file'); // Get 'file' query parameter
    if (sharedFileName) {
      try {
        const fileDocRef = doc(db, 'sharedFiles', sharedFileName);
        const fileSnap = await getDoc(fileDocRef);

        if (fileSnap.exists()) {
          const fileData = fileSnap.data().data;
          // Load the fetched data into the form
          weaponRef.current?.loadData(fileData.weaponData);
          weapon2Ref.current?.loadData(fileData.weapon2Data);
          cradleRef.current?.loadData(fileData.cradleData);
          buffRef.current?.loadData(fileData.buffData);
          helmetRef.current?.loadData(fileData.helmetData);
          faceRef.current?.loadData(fileData.faceData);
          glovesRef.current?.loadData(fileData.glovesData);
          topRef.current?.loadData(fileData.topData);
          bottomsRef.current?.loadData(fileData.bottomsData);
          shoesRef.current?.loadData(fileData.shoesData);
        } else {
          console.error('Shared file not found in Firestore.');
        }
      } catch (error) {
        console.error('Failed to load shared file:', error);
      }
    }
  };

  loadSharedFile();
}, []);

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

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
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

const generateShareUrl = async (fileName) => {
  const baseUrl = 'https://fragment-lake.vercel.app/';
  const fileData = savedFiles[fileName];

  if (!fileData) return;

  const uniqueId = uuidv4(); // Generate a unique ID
  const uniqueFileName = `${fileName}_${uniqueId}`; // Combine file name with unique ID

  const fileDocRef = doc(db, 'sharedFiles', uniqueFileName);
  await setDoc(fileDocRef, { data: fileData });
  const shareableUrl = `${baseUrl}?file=${uniqueFileName}`;

  const urls = { ...fileUrls, [uniqueFileName]: shareableUrl };
  localStorage.setItem('fileUrls', JSON.stringify(urls));
  setFileUrls(urls);

  navigator.clipboard.writeText(shareableUrl);
  alert('Shareable URL copied to clipboard!');
};

const [open, setOpen] = useState(false);

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

            {/* Add this absolutely positioned toggle button */}
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                position: 'fixed',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1300,
                backgroundColor: '#06dbc7',
                borderRadius: '0 0 0 0',
                '&:hover': {
                  backgroundColor: '#127a72',
                },
              }}
            >
              {open ? (
                <ChevronLeftIcon sx={{ color: 'black' }} />
              ) : (
                <ChevronRightIcon sx={{ color: 'black' }} />
              )}
            </IconButton>

            {/* Modified Drawer component */}
            <Drawer
              anchor='left'
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                sx: {
                  width: 600,
                  transition: 'transform 0.3s ease',
                  backgroundColor: '#252a2b',
                  boxShadow: 24,
                },
              }}
            >
              <Box
                sx={{
                  width: 640,
                  height: '100vh',
                  padding: 2,
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h3>Timer</h3>
                <Timer />
              </Box>
            </Drawer>
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
                Load Builds
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.keys(savedFiles).map((name) => (
                  <Box
                    key={name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #4cbda4', // Darker border for dark mode
                      borderRadius: 0, // No rounded corners
                      overflow: 'hidden',
                    }}
                  >
                    {/* File Name Button */}
                    <Button
                      onClick={() => handleLoad(name)}
                      sx={{
                        flex: 1,
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        color: '#47b7a0', // White text for dark mode
                        background: '#15332c',
                        boxShadow: 'none',
                        borderRadius: 0, // No rounded corners
                        padding: '8px 16px',
                        '&:hover': { backgroundColor: '#255f53' }, // Hover effect for dark mode
                      }}
                    >
                      {name}
                    </Button>

                    {/* Share Button */}
                    <Button
                      onClick={() => generateShareUrl(name)}
                      sx={{
                        width: '48px',
                        minWidth: '48px',
                        background: 'none',
                        boxShadow: 'none',
                        borderRadius: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        '&:hover': { backgroundColor: '#255f53' },
                      }}
                    >
                      <ShareIcon fontSize='small' />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      onClick={() => {
                        const updatedFiles = { ...savedFiles };
                        delete updatedFiles[name];
                        localStorage.setItem(
                          'savedFiles',
                          JSON.stringify(updatedFiles)
                        );
                        setSavedFiles(updatedFiles);
                        // Remove associated URL
                        const updatedUrls = { ...fileUrls };
                        delete updatedUrls[name];
                        localStorage.setItem(
                          'fileUrls',
                          JSON.stringify(updatedUrls)
                        );
                        setFileUrls(updatedUrls);
                      }}
                      sx={{
                        width: '48px',
                        minWidth: '48px',
                        background: 'none',
                        boxShadow: 'none',
                        borderRadius: 0, // No rounded corners
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        '&:hover': { backgroundColor: '#255f53' }, // Hover effect for dark mode
                      }}
                    >
                      <CloseIcon fontSize='small' />
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
