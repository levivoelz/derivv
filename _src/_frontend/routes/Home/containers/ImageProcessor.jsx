import { connect } from 'react-redux'
import { processAll } from '@/modules/derivative'

import ImageProcessButton from '@/components/ImageProcessButton'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  image: state.originalImage.file,
  processing: state.derivative.acting
})

const mapActionCreators = {
  processAll
}

export default connect(mapStateToProps, mapActionCreators)(ImageProcessButton)
