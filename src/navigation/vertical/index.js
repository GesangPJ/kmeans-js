// ** Icon imports
import { MonitorHeart } from '@mui/icons-material'
import { AddCircle } from '@mui/icons-material'
import { ModeEdit } from '@mui/icons-material'
import { AdminPanelSettings } from '@mui/icons-material'
import { DocumentScannerOutlined } from '@mui/icons-material'
import DeveloperBoardOutlinedIcon from '@mui/icons-material/DeveloperBoardOutlined'
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined'
import { TuneOutlined } from '@mui/icons-material'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';

const navigation = () => {
  return [
    {
      sectionTitle: 'Dataset'
    },
    {
      title: 'Data Sensor',
      icon: SensorsOutlinedIcon,
      path: '/'
    },
    {
      title: 'Normalisasi Dataset',
      icon: DeveloperBoardOutlinedIcon,
      path: '/normalisasi'
    },
    {
      title: 'Parameter',
      icon: TuneOutlined,
      path: '/parameter'
    },
    {
      sectionTitle: 'K-Means'
    },
    {
      title: 'Kalkulasi K-Means',
      icon: InsightsOutlinedIcon,
      path: '/obat-herbal'
    },
    {
      title: 'Hasil K-Means',
      icon: AssignmentOutlinedIcon,
      path: '/obat-herbal'
    },
    {
      sectionTitle: 'Monitoring'
    },
    {
      title: 'Web Status',
      icon: MonitorHeart,
      path: '/status'
    }


    /*
    {
      title: 'Admin Settings',
      icon: AdminPanelSettings,
      path: '/'
    }


        {
          title: 'Login',
          icon: Login,
          path: '/pages/login',
          openInNewTab: true
        },
        {
          title: 'Register',
          icon: AccountPlusOutline,
          path: '/pages/register',
          openInNewTab: true
        },

    {
      sectionTitle: ''
    }


    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }*/
  ]
}

export default navigation
