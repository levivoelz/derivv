import { connect } from 'react-redux'
import { actions } from '@/modules/configuration'
import ConfigExport from '@/components/ConfigExport'

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  exporting: state.configuration.exporting
})

const mapActionCreators = {
  exportCSV: actions.exportCSV
}

export default connect(mapStateToProps, mapActionCreators)(ConfigExport)
