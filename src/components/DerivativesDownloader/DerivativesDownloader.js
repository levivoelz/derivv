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
    this.props.downloadAll()

    if (!this.userHasBeenSupportive()) {
      this.setState({
        open: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  userHasBeenSupportive = () => {
    return localStorage.getItem('checkedOutMyBuyMeACoffeePage')
  }

  handleBuyMeCoffeeClick = () => {
    localStorage.setItem('checkedOutMyBuyMeACoffeePage', true)

    window.open(
      'https://www.buymeacoffee.com/64GmRBo',
      '_blank'
    )
  }

  shareUrl = () => {
    return (
      process.env.NODE_ENV === 'production'
        ? window.location.href
        : 'http://levivoelz.com'
    )
  }

  shareDefaultMessage = 'Hey, this is a rad way to resize images! Check it out.'

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}>
          <DialogTitle>
            {'Hey! Did you like this app?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              If so, share with your friends so they can try it too and if you really like it, I'd love a coffee ;-)
            </DialogContentText>
            <div className='social-share--buttons' style={{marginBottom: 10}}>
              <FacebookShareButton
                url={this.shareUrl()}
                quote={this.shareDefaultMessage}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={this.shareUrl()}
                title={this.shareDefaultMessage}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <button
              className='bmc-button'
              rel='noopener noreferrer'
              onClick={this.handleBuyMeCoffeeClick}>
              <img
                src='https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg'
                alt='buy me a coffee' />
              <span style={{marginLeft: 5}}>Buy me a coffee</span>
            </button>
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
