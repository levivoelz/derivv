import { connect } from 'react-redux'
import { processAll, enableDownload, acting } from 'modules/derivative'

import ImageProcessButton from 'components/ImageProcessButton'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  image: state.originalImage.file
})

const mapActionCreators = {
  processImages: processAll,
  enableDownload,
  processing: acting
}

export default connect(mapStateToProps, mapActionCreators)(ImageProcessButton)
