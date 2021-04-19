import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PublishIcon from '@material-ui/icons/Publish'
import { Button, CircularProgress } from '@material-ui/core';

class ConfigImport extends Component {
  openFileDialog = () => {
    findDOMNode(this.input).click()
  }

  handleChange = (e) => {
    this.props.importCSV(e.target.files[0])
    this.input.value = null
  }

  render() {
    return (
      <div>
        <Button
          color='primary'
          onClick={this.openFileDialog}>
          {this.props.importing
            ? <CircularProgress size={24} style={{marginRight: 5}} />
            : <PublishIcon />}
          Import CSV
        </Button>
        <input
          ref={(r) => {this.input = r}}
          onChange={this.handleChange}
          style={{display: 'none'}}
          type='file'
          accept='.csv'
          id='imageButton'></input>
      </div>
    );
  }
}

export default ConfigImport
