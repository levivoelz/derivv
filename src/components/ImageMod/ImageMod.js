import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import ImageEditor from 'react-avatar-editor'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
} from '@material-ui/core'

class ImageMod extends Component {
  state = {
    open: false,
    name: this.props.image.name
  }

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }

  updateImage = () => {
    this.closeDialog()
    this.props.processOne(this.props.originalImage, {
      ...this.editor.getCroppingRect(),
      width: this.props.image.width,
      height: this.props.image.height,
      id: this.props.image.id,
      name: this.state.name,
      resizeType: 'resizeByCoordinates'
    })
  }

  setEditorRef = editor => this.editor = editor
  setNameRef = ref => this.name = ref

  render() {
    return (
      <div>
        <IconButton
          onClick={this.openDialog}
          title='Adjust Crop'
          color='primary'
          disabled={this.props.image.resizeType === 'resizeProportionally'}
          style={{width: 30, height: 30, padding: 3, fontSize: '1.2rem'}}>
          <EditIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.closeDialog}
          maxWidth={false}>
          <DialogTitle>Edit image crop and name</DialogTitle>
          <DialogContent>
            <ImageEditor
              ref={this.setEditorRef}
              image={this.props.originalImage.preview}
              width={this.props.image.width}
              height={this.props.image.height}
              border={[25, 25]}
              scale={1} />
          </DialogContent>
          <DialogContent>
            <TextField
              id='name'
              label='Name'
              onChange={this.handleNameChange}
              value={this.state.name} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.updateImage} color='primary'>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ImageMod
