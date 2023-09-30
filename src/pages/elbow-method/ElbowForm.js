import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';

const InputElbowForm = () => {
  const [JumlahCluster, setJumlahCluster] = useState('');
  const [perulangan, setperulangan] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state
  const handleJumlahClusterChange = (e) => setJumlahCluster(e.target.value);
  const handleperulanganChange = (e) => setperulangan(e.target.value);

  // Validation function
  const isInputValid = () => {
    if (!JumlahCluster || !perulangan) {
      setErrorMessage('Jumlah Cluster and Perulangan cannot be empty.');

      return false;
    }
    if (parseInt(perulangan) > 10) {
      setErrorMessage('Perulangan (Loop) Elbow cannot be greater than 10.');

      return false;
    }
    setErrorMessage('');

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputValid()) {
      return;
    }

    const ElbowInput = {
      JumlahCluster,
      perulangan,
    };

    try {
      const response = await fetch('http://localhost:3001/api/post-elbow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ElbowInput),
      });

      if (response.ok) {
        setSuccessMessage(`Parameter Berhasil Dikirim`);
        setJumlahCluster('');
        setperulangan('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        console.error('Error Gagal Kirim Parameter.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <CardHeader title='Metode Elbow' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Jumlah Cluster'
                name='JumlahCluster'
                placeholder='Jumlah Cluster'
                helperText='Masukkan Jumlah Cluster'
                value={JumlahCluster}
                onChange={handleJumlahClusterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Perulangan (Loop) Elbow'
                name='perulangan'
                placeholder='Perulangan (Loop) Elbow'
                helperText='Masukkan Jumlah Loop Elbow (10 Max)'
                value={perulangan}
                onChange={handleperulanganChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Mulai Elbow
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputElbowForm;
