import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import '@fontsource/figtree';

const TimerRow = ({ title, index }) => {
  const storageKey = `timer_${index}`;
  const runningKey = `timer_running_${index}`;
  const startTimeKey = `timer_start_time_${index}`;

  const savedTime = localStorage.getItem(storageKey);
  const savedRunning = localStorage.getItem(runningKey) === 'true';
  const savedStartTime = localStorage.getItem(startTimeKey);

  const [timeLeft, setTimeLeft] = useState(
    savedTime ? parseInt(savedTime, 10) : 3600
  );
  const [isRunning, setIsRunning] = useState(savedRunning);

  useEffect(() => {
    if (isRunning) {
      const now = Math.floor(Date.now() / 1000);
      if (savedStartTime) {
        const elapsed = now - parseInt(savedStartTime, 10);
        setTimeLeft((prev) => Math.max(prev - elapsed, 0));
      }
      localStorage.setItem(startTimeKey, now);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, timeLeft);
    localStorage.setItem(runningKey, isRunning);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem(storageKey, prev - 1);
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      resetTimer();
    }
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(3600);
    setIsRunning(false);
    localStorage.setItem(storageKey, 3600);
    localStorage.setItem(runningKey, 'false');
    localStorage.removeItem(startTimeKey);
  };

  const handleButtonClick = () => {
    if (isRunning) {
      resetTimer();
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#222323',
        color: '#ffffff',
        padding: '8px',
        marginBottom: '8px',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <Typography
        sx={{ flex: 1, textAlign: 'left', fontFamily: 'Figtree, sans-serif' }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          flex: 1,
          textAlign: 'center',
          fontSize: '1.2rem',
          fontFamily: 'Figtree, sans-serif',
          color: isRunning ? '#06dbc7' : '#ffffff',
        }}
      >
        {formatTime(timeLeft)}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant='contained'
          onClick={handleButtonClick}
          sx={{
            borderRadius: 0,
            width: '100px',
            boxShadow: 'none',
            backgroundColor: isRunning
              ? timeLeft === 0
                ? '#d32f2f'
                : '#1b4e47'
              : '#06dbc7',
            fontWeight: 'bold',
            color: isRunning ? (timeLeft === 0 ? '#fff' : '#06dbc7') : 'black',
            '&:hover': {
              backgroundColor: isRunning
                ? timeLeft === 0
                  ? '#b71c1c'
                  : '#1e3230'
                : '#127a72',
            },
          }}
        >
          {isRunning ? 'Reset' : <TimerOutlinedIcon />}
        </Button>
      </Box>
    </Box>
  );
};

const Timer = () => {
  const titles = [
    'Operation Chiron',
    'Paradise Lost',
    'The Dark Side',
    'Dig to Hell',
    'Where Does Disco Go',
    'Fatal Signal',
    'Battleship',
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        padding: '16px',
        bgcolor: '#252a2b',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      {titles.map((title, i) => (
        <TimerRow key={i} title={title} index={i} />
      ))}
    </Box>
  );
};

export default Timer;
