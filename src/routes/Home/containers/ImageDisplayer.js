import { connect } from 'react-redux'

import ImageList from 'components/ImageList'

const mapStateToProps = (state) => ({
  images: state.file.derivatives
})

export default connect(mapStateToProps, null)(ImageList)
