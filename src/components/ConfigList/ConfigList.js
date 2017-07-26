import React, { PropTypes } from 'react'
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
      <ol className={classes.wrapper}>
        {dimensionsList.map(renderDimensions)}
      </ol>
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
