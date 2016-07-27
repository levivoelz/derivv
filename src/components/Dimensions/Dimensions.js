import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { TableRow, TableRowColumn } from 'material-ui/Table'

export const Dimensions = (props) => {
  const fieldStyle = {marginRight: 10}
  const {dimensions, onAddClick, onRemoveClick, onChange, lastItem, onlyItem} = props
  const handleRemoveClick = () => { onRemoveClick(dimensions.id) }
  const handleChange = (e) => {
    onChange({
      ...dimensions,
      [e.target.name]: e.target.value
    })
  }

  const renderAddButton = () => (
    <FloatingActionButton mini zDepth={0} onTouchTap={onAddClick}>
      <ContentAdd />
    </FloatingActionButton>
  )

  return (
    <TableRow displayBorder={false}>
      <TableRowColumn>
        <TextField
          floatingLabelText='width in px'
          name='width'
          onChange={handleChange}
          value={dimensions.width}
          type='number' />
      </TableRowColumn>
      <TableRowColumn>
        <TextField
          floatingLabelText='height in px'
          name='height'
          onChange={handleChange}
          value={dimensions.height}
          type='number' />
      </TableRowColumn>
      <TableRowColumn>
        <FloatingActionButton disabled={onlyItem} style={{marginRight: 10}} mini zDepth={0} onTouchTap={handleRemoveClick}>
          <ContentClear />
        </FloatingActionButton>
        {lastItem ? renderAddButton() : ' '}
      </TableRowColumn>
    </TableRow>
  )
}

export default Dimensions
