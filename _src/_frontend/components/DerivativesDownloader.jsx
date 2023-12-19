import React from 'react'
import DownloadButton from '@/components/DownloadButton'

const DerivativesDownloader = ({downloadAll, disabled}) => (
  <DownloadButton onClick={downloadAll} disabled={disabled} />
)

export default DerivativesDownloader
