import { connect } from 'react-redux'
import { downloadAll } from '@/modules/derivative'

import DerivativesDownloader from '@/components/DerivativesDownloader'

const mapStateToProps = (state) => ({
  disabled: !state.derivative.downloadable || state.derivative.images.length === 0
})

const mapActionCreators = {
  downloadAll
}

export default connect(mapStateToProps, mapActionCreators)(DerivativesDownloader)
