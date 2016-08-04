import { connect } from 'react-redux'
import { addDerivative } from 'modules/file'
import { dimensionsList } from 'modules/configuration'

import ImageProcessButton from 'components/ImageProcessButton'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  image: state.file.image
})

const mapActionCreators = {
  addDerivative
}

export default connect(mapStateToProps, mapActionCreators)(ImageProcessButton)