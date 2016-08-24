import { connect } from 'react-redux'
import { addImage } from 'modules/originalImage'

import Uploader from 'components/Uploader'

const mapStateToProps = (state) => ({
  image: state.originalImage.file,
  loading: state.originalImage.acting
})

const mapActionCreators = {
  addImage
}

export default connect(mapStateToProps, mapActionCreators)(Uploader)
