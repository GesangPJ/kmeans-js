// ** MUI Imports
import Grid from '@mui/material/Grid'
import InputParameterForm from './ParameterForm'

const ParameterPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <InputParameterForm />
      </Grid>

    </Grid>
  )
}

export default ParameterPage
