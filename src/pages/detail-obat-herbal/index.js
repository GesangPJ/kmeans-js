import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const DetailObatHerbal = () => {
  const router = useRouter();
  const { namaObat } = router.query;
  const [obat, setObat] = useState(null);

  useEffect(() => {
    if (namaObat) {
      // Fetch the details of the selected obat based on the _id
      fetch(`http://localhost:3001/api/obat-herbal/${namaObat}`)
        .then((response) => response.json())
        .then((data) => {
          setObat(data);
        })
        .catch((error) => {
          console.error('Error fetching obat details:', error);
        });
    }
  }, [namaObat]);

  return (
    <Card>
      <CardHeader title='' titleTypographyProps={{ variant: 'h3' }} position="center" />
      <CardContent>
        <Grid container spacing={6} justifyContent="center" textAlign={'justify'} style={{ marginBottom: '10px' }}>
          <Typography variant='h2'>
            {obat?.namaObat}
          </Typography>
        </Grid>
        {obat ? (
          <Grid container spacing={6} justifyContent="center" textAlign={'justify'} style={{ marginBottom: '10px' }}>
            <Typography variant='h5'>

            </Typography>
          </Grid>
        ) : (
          <Typography variant='body1'>Loading...</Typography>
        )}
        {obat ? (
          <>
            <br></br>
            <Grid container spacing={6} justifyContent="center" textAlign={'justify'}>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Nama Obat</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography sx={{ marginBottom: 2 }}>
                </Typography>
                <Typography variant='body1'>{obat?.namaObat}</Typography>
              </DemoGrid>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Komposisi</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography sx={{ marginBottom: 2 }}>
                </Typography>
                <Typography variant='body1'>{obat?.komposisi}</Typography>
              </DemoGrid>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Nama Latin</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography sx={{ marginBottom: 2 }}>
                </Typography>
                <Typography variant='body1'>{obat?.latin}</Typography>
              </DemoGrid>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Manfaat Utama</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography sx={{ marginBottom: 2 }}>
                </Typography>
                <Typography variant='body1'>{obat?.kegunaanUtama}</Typography>
              </DemoGrid>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Deskripsi</Typography>
              </Grid>
              <DemoGrid item xs={12} sm={10}>
                <Typography sx={{ marginBottom: 2 }}>

                </Typography>
                <Typography variant='body1'>{obat?.deskripsi}</Typography>
              </DemoGrid>
            </Grid>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default DetailObatHerbal;
