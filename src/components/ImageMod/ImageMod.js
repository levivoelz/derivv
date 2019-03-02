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
    this.props.processOne(this.props.originalImage, {
      ...this.editor.getCroppingRect(),
      width: this.props.image.width,
      height: this.props.image.height,
      id: this.props.image.id,
      resizeType: 'resizeByCoordinates'
    })
  }

  setEditorRef = (editor) => this.editor = editor

  render() {
    return (
      <div>
        <IconButton
          onClick={this.openDialog}
          title='Adjust Crop'
          color='primary'
          disabled={this.props.image.resizeType === 'resizeProportionally'}
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
