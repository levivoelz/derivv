import React from 'react'
import Dimensions from '@/components/Dimensions'
import './ConfigList.css'

export const ConfigList = (props) => {
  const {dimensionsList, addDimensions, removeDimensions, updateDimensions} = props
  const renderDimensions = (d, i) => {
    const list = dimensionsList
    const onlyItem = dimensionsList.length === 1
    let lastItem = false

    if (list[list.length - 1].id === d.id) { lastItem = true }

    return (
      <Dimensions
        key={i}
        dimensions={d}
        lastItem={lastItem}
        onlyItem={onlyItem}
        onAddClick={addDimensions}
        onChange={updateDimensions}
        onRemoveClick={removeDimensions} />
    )
  }

  return (
    <ol className='configure--list'>
      {dimensionsList.map(renderDimensions)}
    </ol>
  )
}

export default ConfigList
