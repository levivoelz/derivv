import { connect } from 'react-redux'
import { addImage } from '@/modules/originalImage'
import { clearAll } from '@/modules/derivative'

import Uploader from '@/components/Uploader'

const mapStateToProps = (state) => ({
  image: state.originalImage.file,
  loading: state.originalImage.acting
})

const mapActionCreators = {
  addImage,
  clearAllDerivatives: clearAll
}

export default connect(mapStateToProps, mapActionCreators)(Uploader)
