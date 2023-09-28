import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`,
  },
}));

const DetailObat = ({ obat }) => {
  return (
    <Card>
      <CardHeader title='' titleTypographyProps={{ variant: 'h3' }} position="center" />
      <CardContent>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'} style={{ marginBottom: '10px' }}>
          <Typography variant='h2'>
            Detail Obat
          </Typography>
        </Grid>
        <br></br>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'} style={{ marginBottom: '10px' }}>
          <Typography variant='h5'>
            {obat.namaObat}
          </Typography>
        </Grid>
        <br></br>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'}>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Nama Obat</Typography>
          </Grid>
          <DemoGrid item xs={12} sm={10}>
            <Typography sx={{ marginBottom: 2 }}>

            </Typography>
            <Typography variant='body1'>{obat.namaObat}</Typography>
          </DemoGrid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Komposisi</Typography>
          </Grid>
          <DemoGrid item xs={12} sm={10}>
            <Typography sx={{ marginBottom: 2 }}>
              {obat.komposisi}
            </Typography>
            <Typography variant='body1'>font-size: 16px / line-height: 24px / font-weight: 400</Typography>
          </DemoGrid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Manfaat Utama</Typography>
          </Grid>
          <DemoGrid item xs={12} sm={10}>
            <Typography sx={{ marginBottom: 2 }}>
              {obat.kegunaanUtama}
            </Typography>
            <Typography variant='body1'>font-size: 16px / line-height: 24px / font-weight: 400</Typography>
          </DemoGrid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Deskripsi </Typography>
          </Grid>
          <DemoGrid item xs={12} sm={10}>
            <Typography sx={{ marginBottom: 2 }}>
              {obat.deskripsi}
            </Typography>
            <Typography variant='body1'>font-size: 16px / line-height: 24px / font-weight: 400</Typography>
          </DemoGrid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailObat;
