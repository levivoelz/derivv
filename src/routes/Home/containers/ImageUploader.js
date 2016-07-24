import { connect } from 'react-redux'
import { addImage } from 'modules/file'

import Uploader from 'components/Uploader'

const mapStateToProps = (state) => ({
  image: state.file.image
})

const mapActionCreators = {
  addImage
}

export default connect(mapStateToProps, mapActionCreators)(Uploader)
