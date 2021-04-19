import React from 'react'
import FileDownloadIcon from '@material-ui/icons/GetApp'
import { Button, CircularProgress } from '@material-ui/core'

const ConfigExport = ({exportCSV, exporting}) => (
  <Button color='primary' onClick={exportCSV}>
    {exporting
      ? <CircularProgress size={24} style={{marginRight: 5}} />
      : <FileDownloadIcon />}
    Export CSV
  </Button>
)

export default ConfigExport
