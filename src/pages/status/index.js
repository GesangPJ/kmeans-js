// ** MUI Imports
import Grid from '@mui/material/Grid'

import StatusPage from 'src/views/statuspage'

const Status = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StatusPage />
      </Grid>
    </Grid>
  )
}

export default Status
