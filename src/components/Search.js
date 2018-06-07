import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from './ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 12,
    apiUrl: 'https://pixabay.com/api',
    apiKey: 'YOUR_API_KEY_HERE',
    images: []
  }

  getImages() {
    axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}`)
          .then(response => this.setState({images: response.data.hits}))
          .catch(error => console.log(error));
  }

  handleTextChange = e => {
    // const { searchText, amount, apiUrl, apiKey } = this.state;
    const value = e.target.value;    

    this.setState({ searchText: value }, () => {
      if (value === '') {
        this.setState({images: []});
      } else {
        this.getImages();          
      }      
    });
  };

  handleSelectChange = (e, index, value) => {
    this.setState({amount: value}, () => {
      this.getImages();
    });
  }

  render() {
    // const { searchText, amount, images } = this.state;

    // console.log(images);

    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <TextField 
            name='searchText'
            value={ this.state.searchText }
            onChange={ this.handleTextChange }
            floatingLabelText={ 'Search for images' }
            style={{ flexGrow: '1', marginRight: '1rem' }}
            // fullWidth={ true }
          />
          {/* <br/> */}
          <SelectField
            name="amount"
            floatingLabelText="Amount"
            value={this.state.amount}
            onChange={this.handleSelectChange}
            style={{ width: '100px' }}
          >
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={6} primaryText="6" />
            <MenuItem value={12} primaryText="12" />
            <MenuItem value={24} primaryText="24" />
            <MenuItem value={48} primaryText="48" />
          </SelectField>
          {/* <Select
            value={ this.state.amount }
            onChange={ this.handleSelectChange }
            inputProps={{
              name: 'amount',
              id: 'amount-id',
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select> */}
          {/* <br/> */}
        </div>
        <br/>
        {this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : null}
      </React.Fragment>
    );
  }
}

export default Search;