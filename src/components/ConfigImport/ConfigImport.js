import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PublishIcon from '@material-ui/icons/Publish'
import { Button, CircularProgress } from '@material-ui/core';

class ConfigImport extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef()
  }
  openFileDialog = () => {
    findDOMNode(this.input.current).click()
  }

  handleChange = (e) => {
    this.props.importCSV(e.target.files[0])
    this.input.current.value = null
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
          ref={this.input}
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
