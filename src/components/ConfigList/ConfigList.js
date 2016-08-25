import React, { PropTypes } from 'react'
import { Table, TableBody } from 'material-ui/Table'

import Dimensions from 'components/Dimensions'

import classes from './ConfigList.scss'

export const ConfigList = (props) => {
  const {dimensionsList, addDimensions, removeDimensions, updateDimensions} = props
  const renderDimensions = (d, i) => {
    const list = dimensionsList
    const onlyItem = dimensionsList.length === 1
    let lastItem = false

    if (list[list.length - 1].id === d.id) { lastItem = true }

    return (
      <Dimensions
        listNum={i + 1}
        key={d.id}
        dimensions={d}
        lastItem={lastItem}
        onlyItem={onlyItem}
        onAddClick={addDimensions}
        onChange={updateDimensions}
        onRemoveClick={removeDimensions} />
    )
  }

  return (
    <div>
      <h2>Configure Sizes</h2>
      <Table selectable={false} className={classes.wrapper}>
        <TableBody>
          {dimensionsList.map(renderDimensions)}
        </TableBody>
      </Table>
    </div>
  )
}

ConfigList.propTypes = {
  dimensionsList: PropTypes.array.isRequired,
  addDimensions: PropTypes.func.isRequired,
  removeDimensions: PropTypes.func.isRequired,
  updateDimensions: PropTypes.func.isRequired
}

export default ConfigList
