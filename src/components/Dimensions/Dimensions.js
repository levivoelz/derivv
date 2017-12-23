import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'

import './Dimensions.css'

export const Dimensions = (props) => {
  const {
    dimensions,
    onAddClick,
    onRemoveClick,
    onChange,
    lastItem,
    onlyItem
  } = props
  const handleRemoveClick = () => { onRemoveClick(dimensions.id) }
  const handleChange = (e) => {
    onChange({
      ...dimensions,
      [e.target.name]: parseInt(e.target.value, 10) || ''
    })
  }

  const renderAddButton = () => (
    <IconButton
      onClick={onAddClick}
      color='primary'
      style={buttonStyles}>
      <AddIcon />
    </IconButton>
  )

  const buttonStyles = {padding: 0, width: 30, height: 30}

  return (
    <li className='dimensions'>
      <TextField
        style={{marginRight: 5}}
        label='width in px'
        name='width'
        onChange={handleChange}
        value={dimensions.width}
        type='number' />
      <TextField
        label='height in px'
        name='height'
        onChange={handleChange}
        value={dimensions.height}
        type='number' />
      <IconButton
        disabled={onlyItem}
        style={buttonStyles}
        color='primary'
        onClick={handleRemoveClick}>
        <RemoveIcon />
      </IconButton>
      {lastItem ? renderAddButton() : ' '}
    </li>
  )
}

export default Dimensions
