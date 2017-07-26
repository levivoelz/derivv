import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add-circle-outline'
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline'

const propTypes = {
  dimensions: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  lastItem: PropTypes.bool.isRequired,
  onlyItem: PropTypes.bool.isRequired
}

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
      [e.target.name]: parseInt(e.target.value) || ''
    })
  }

  const renderAddButton = () => (
    <IconButton
      onTouchTap={onAddClick}
      style={buttonStyles}>
      <ContentAdd color='#57ac89' />
    </IconButton>
  )

  const buttonStyles = {padding: 0, width: 30, height: 30}

  return (
    <li>
      <TextField
        style={{marginRight: 5}}
        floatingLabelText='width in px'
        name='width'
        onChange={handleChange}
        value={dimensions.width}
        type='number' />
      <TextField
        floatingLabelText='height in px'
        name='height'
        onChange={handleChange}
        value={dimensions.height}
        type='number' />
      <IconButton
        disabled={onlyItem}
        style={buttonStyles}
        onTouchTap={handleRemoveClick}>
        <ContentRemove color='#57ac89' />
      </IconButton>
      {lastItem ? renderAddButton() : ' '}
    </li>
  )
}

Dimensions.propTypes = propTypes

export default Dimensions
