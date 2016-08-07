import { connect } from 'react-redux'
import { downloadDerivatives } from 'modules/file'

import DownloadButton from 'components/DownloadButton'

const mapStateToProps = (state) => ({
  disabled: !state.file.downloadable
})

const mapActionCreators = {
  onClick: downloadDerivatives
}

export default connect(mapStateToProps, mapActionCreators)(DownloadButton)
