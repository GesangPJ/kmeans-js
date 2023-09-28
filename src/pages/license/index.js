// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import TypographyTexts from 'src/views/typography/TypographyTexts'
import TypographyHeadings from 'src/views/typography/TypographyHeadings'
import LicenseText from 'src/views/license/LicenseText'

const License = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LicenseText />
      </Grid>
    </Grid>
  )
}

export default License
