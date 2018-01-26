import React, { Component } from 'react'
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog'
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
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()
      // console.log(canvas)

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas()
      // console.log(canvasScaled)
      this.props.updateDerivative(image.id, canvasScaled.toDataURL())
    }
  }

  setEditorRef = (editor) => this.editor = editor

  editorBorder = () => {
    const img = this.props.image
    return Math.max(img.width, img.height) === img.height
      ? [50, 0]
      : [0, 50]
  }

  render() {
    return (
      <div>
        <IconButton
          onClick={this.openDialog}
          color='primary'
          style={{width: 30, height: 30, padding: 7}}>
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
              border={this.editorBorder()}
              scale={1} />
            <DialogContentText>
              You can do it!
            </DialogContentText>
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
