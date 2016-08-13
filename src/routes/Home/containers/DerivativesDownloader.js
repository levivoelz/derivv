import { connect } from 'react-redux'
import { downloadDerivatives } from 'modules/file'

import DownloadButton from 'components/DownloadButton'

const mapStateToProps = (state) => ({
  disabled: !state.file.downloadable || state.file.derivatives.length === 0
})

const mapActionCreators = {
  onClick: downloadDerivatives
}

export default connect(mapStateToProps, mapActionCreators)(DownloadButton)
