import { connect } from 'react-redux'
import { add, enableDownload } from 'modules/derivative'

import ImageProcessButton from 'components/ImageProcessButton'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  image: state.originalImage.file
})

const mapActionCreators = {
  addDerivative: add,
  enableDownload
}

export default connect(mapStateToProps, mapActionCreators)(ImageProcessButton)
