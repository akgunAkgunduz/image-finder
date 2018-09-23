import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from './ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 4,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '9175739-cf00ee6258f146f0f411fc495',
    images: []
  }

  getImages() {
    axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}`)
          .then(response => this.setState({images: response.data.hits}))
          .catch(error => console.log(error));
  }

  handleTextChange = e => {
    const value = e.target.value;    

    this.setState({ searchText: value }, () => {
      if (value === '') {
        this.setState({images: []});
      } 
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.getImages();
    }
  }

  handleSelectChange = (e, index, value) => {
    this.setState({amount: value});
  }

  handleClick = () => {
    this.getImages();
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'grid', gridTemplateColumns: '6fr 1fr 3fr', gridColumnGap: '8px' }}>
          <div>
          <TextField 
            name='searchText'
            value={ this.state.searchText }
            onChange={ this.handleTextChange }
            onKeyDown={ this.handleKeyDown }
            floatingLabelText={ 'Search for images' }
            style={{ width: '100%' }}
          />
          </div>
          <div>
          <SelectField
            name="amount"
            floatingLabelText="Amount"
            value={this.state.amount}
            onChange={this.handleSelectChange}
            style={{ width: '100%' }}
          >
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={8} primaryText="8" />
            <MenuItem value={16} primaryText="16" />
          </SelectField>
          </div>
          <div style={{ position: 'relative' }}>
            <RaisedButton 
              label="Find" 
              primary={true} 
              style={{ position: 'absolute', top: '26px', width: '100%' }}
              onClick={this.handleClick}
            />
          </div>
        </div>
        <br/>
        {this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : null}
      </React.Fragment>
    );
  }
}

export default Search;