import { connect } from 'react-redux'

import ImageList from 'components/ImageList'

const mapStateToProps = (state) => ({
  images: state.derivative.images
})

export default connect(mapStateToProps, null)(ImageList)
