import React, { Component } from 'react'
import DownloadButton from 'components/DownloadButton'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'
import './DerivativesDownloader.css'

class DerivativesDownloader extends Component {
  state = {
    open: false
  }

  onDownloadClick = () => {
    this.setState({
      open: true
    })

    this.props.downloadAll()
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}>
          <DialogTitle>{'Hey! Did you like this app?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If so, share with your friends so they can try it too and if you really like it, I'd love a coffee ;-)
            </DialogContentText>
            <div className='social-share--buttons'>
              <FacebookShareButton
                url={process.env.NODE_ENV === 'production' ? window.location.href : 'http://levivoelz.com'}
                quote='Hey, this is a rad way to resize images! Check it out.'>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={process.env.NODE_ENV === 'production' ? window.location.href : 'http://levivoelz.com'}
                title='Hey, this is a rad way to resize images! Check it out.'>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <a className='bmc-button' target='_blank' rel='noopener noreferrer' href='https://www.buymeacoffee.com/64GmRBo'>
              <img src='https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg' alt='' />
              <span style={{marginLeft: 5}}>Buy me a coffee</span>
            </a>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <DownloadButton
          onClick={this.onDownloadClick}
          disabled={this.props.disabled} />
      </div>
    )
  }

}

export default DerivativesDownloader
