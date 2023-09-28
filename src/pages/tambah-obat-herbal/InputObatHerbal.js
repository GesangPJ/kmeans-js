import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert'; // Import the Alert component for displaying success message

const FormObatHerbal = () => {
  const [namaObat, setNamaObat] = useState('');
  const [komposisi, setKomposisi] = useState('');
  const [latin, setlatin] = useState('');
  const [kegunaanUtama, setKegunaanUtama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State variable for success message

  const handlelatinChange = (e) => setlatin(e.target.value);
  const handleNamaObatChange = (e) => setNamaObat(e.target.value);
  const handleKomposisiChange = (e) => setKomposisi(e.target.value);
  const handleKegunaanUtamaChange = (e) => setKegunaanUtama(e.target.value);
  const handleDeskripsiChange = (e) => setDeskripsi(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with all the input data
    const obatData = {
      namaObat,
      komposisi,
      kegunaanUtama,
      deskripsi,
      latin,
    };

    try {
      const response = await fetch('http://localhost:3001/api/add-obat-herbal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obatData),
      });

      if (response.ok) {
        // Data sukses ditambah ke MongoDB
        // Popup sukses dan hapus input field
        setSuccessMessage(`Obat ${namaObat} berhasil ditambahkan.`);
        setNamaObat('');
        setKomposisi('');
        setlatin('');
        setKegunaanUtama('');
        setDeskripsi('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        // Kalo Error
        console.error('Error adding obat.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <CardHeader title='Form Tambah Obat Herbal' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        {successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Nama Obat'
                name='namaObat'
                placeholder='Nama Obat'
                helperText='Masukkan Nama Obat'
                value={namaObat}
                onChange={handleNamaObatChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Komposisi'
                name='komposisi'
                placeholder='Komposisi'
                helperText='Masukkan Komposisi Obat'
                value={komposisi}
                onChange={handleKomposisiChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Nama Latin'
                name='latin'
                placeholder='Nama Latin'
                helperText='Masukkan Nama Latin Obat'
                value={latin}
                onChange={handlelatinChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                label='Kegunaan Utama'
                name='kegunaanUtama'
                placeholder='Kegunaan Utama'
                helperText='Masukkan Manfaat utama obat'
                value={kegunaanUtama}
                onChange={handleKegunaanUtamaChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi'
                name='deskripsi'
                placeholder='Masukkan deskripsi atau detail mengenai Obat'
                value={deskripsi}
                onChange={handleDeskripsiChange}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: <InputAdornment position='start' />,
                }}
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
                  Tambah Obat
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        {successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FormObatHerbal;
