import React from 'react'
import Button from 'material-ui/Button'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import { CircularProgress } from 'material-ui/Progress'

const ConfigExport = ({exportCSV, exporting}) => (
  <Button color='primary' onClick={exportCSV}>
    {exporting
      ? <CircularProgress size={24} style={{marginRight: 5}} />
      : <FileDownloadIcon />}
    Export CSV
  </Button>
)

export default ConfigExport
