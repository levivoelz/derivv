import { connect } from 'react-redux'
import ImageDisplayer from '@/components/ImageDisplayer'
import { processOne } from '@/modules/derivative'

const mapStateToProps = (state) => ({
  images: state.derivative.images,
  processing: state.derivative.acting,
  originalImage: state.originalImage.file
})

const mapActionCreators = {
  processOne
}

export default connect(mapStateToProps, mapActionCreators)(ImageDisplayer)
