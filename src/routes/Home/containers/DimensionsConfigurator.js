import { connect } from 'react-redux'
import { actions } from 'modules/configuration'

import DimensionsList from 'components/DimensionsList'

const { addDimensions, removeDimensions, updateDimensions } = actions

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList
})

const mapActionCreators = {
  addDimensions,
  removeDimensions,
  updateDimensions
}

export default connect(mapStateToProps, mapActionCreators)(DimensionsList)
