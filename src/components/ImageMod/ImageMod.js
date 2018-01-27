import React, { Component } from 'react'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import CropIcon from 'material-ui-icons/Crop'
import ImageEditor from 'react-avatar-editor'

class ImageMod extends Component {
  state = {
    open: false
  }

  openDialog = () => {
    this.setState({open: true})
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  updateImage = () => {
    this.closeDialog()
    setTimeout(() => {
      this.props.processOne(this.props.originalImage, {
        ...this.editor.getCroppingRect(),
        width: this.props.image.width,
        height: this.props.image.height,
        id: this.props.image.id,
        resizeType: 'resizeByCoordinates'
      })
    }, 10)
  }

  setEditorRef = (editor) => this.editor = editor

  buttonDisabled = () => {
    const {width, height} = this.props.image

    return (width && !height) || (!width && height)
  }

  render() {
    return (
      <div>
        <IconButton
          onClick={this.openDialog}
          color='primary'
          disabled={this.buttonDisabled()}
          style={{width: 30, height: 30, padding: 3, fontSize: '1.2rem'}}>
          <CropIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.closeDialog}
          maxWidth={false}>
          <DialogTitle>Adjust crop</DialogTitle>
          <DialogContent>
            <ImageEditor
              ref={this.setEditorRef}
              image={this.props.originalImage.preview}
              width={this.props.image.width}
              height={this.props.image.height}
              disableDrop
              border={[25, 25]}
              scale={1} />
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
