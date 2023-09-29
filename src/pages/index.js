// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableSensorData from './tablesensordata'

const ObatGenerik = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='' target='_blank'>
            Sensor Data
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Tabel Sensor Data' titleTypographyProps={{ variant: 'h6' }} />
          <TableSensorData />
        </Card>
      </Grid>
    </Grid>
  )
}

export default ObatGenerik
