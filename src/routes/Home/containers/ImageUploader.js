import { connect } from 'react-redux'
import { addImageAsync } from 'modules/file'

import Uploader from 'components/Uploader'

const mapStateToProps = (state) => ({
  image: state.file.image
})

const mapActionCreators = {
  addImageAsync
}

export default connect(mapStateToProps, mapActionCreators)(Uploader)
