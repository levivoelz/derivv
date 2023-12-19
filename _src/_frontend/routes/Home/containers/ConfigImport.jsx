import { connect } from 'react-redux'
import { actions } from '@/modules/configuration'
import ConfigImport from '@/components/ConfigImport'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  importing: state.configuration.acting
})

const mapActionCreators = {
  importCSV: actions.importCSV
}

export default connect(mapStateToProps, mapActionCreators)(ConfigImport)
