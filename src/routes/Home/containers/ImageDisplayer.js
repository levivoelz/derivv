import { connect } from 'react-redux'
import ImageDisplayer from 'components/ImageDisplayer'

const mapStateToProps = (state) => ({
  images: state.derivative.images,
  processing: state.derivative.acting,
  originalImage: state.originalImage.file
})

export default connect(mapStateToProps, null)(ImageDisplayer)
