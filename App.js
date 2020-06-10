import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css';
import './components/FontAwesomeIcons'
import ProductsTable from './components/ProductsTable';
import CheckBoxsTable from './components/CheckBoxsTable';
import RadioBoxsTable from './components/RadioBoxsTable';

const type = ['All', 'Lounge', 'ErgonomicChairs', 'ClassroomChair', 'BarStool']
const price = ['Highest first', 'Lowest first']

class App extends Component {

  state = {
    fetchedProducts: [],
    selectedTypes: ['All'],
    selectedPrice: '1',
  }

  async componentDidMount() {
    const productsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/products'
    })

    const fetchedProducts = productsRes.data;

    this.setState({fetchedProducts});
  }

  getSelectedType = (selectedTypes) => {
    this.setState({selectedTypes});
  }

  getSelectedPrice = (selectedPrice) => {
    this.setState({selectedPrice});
  }

  render() {

    const {fetchedProducts} = this.state;

    return (
      <div className="App">
        <div className="Nav-wrapper">
          <div className="Nav-logo">Hollend Furnishings</div>
          <div className="Nav-user"><FontAwesomeIcon icon="user-circle" className="nav-icon" />     YorkRegionalSchoolBoard.</div>
        </div>

        <div className="Filter">
          <div className="Filter-type">
            <CheckBoxsTable list={type} onSelectType={this.getSelectedType}/>
          </div>
          <div className="Filter-price">
            <RadioBoxsTable list={price} onSelectPrice={this.getSelectedPrice}/>
          </div>
        </div>

        <div className="ProductsTable-wrapper">
          <ProductsTable 
            className="ProductsTable" 
            products={fetchedProducts} 
            selectedTypes={this.state.selectedTypes} 
            selectedPrice={this.state.selectedPrice}/>
        </div>
      </div>
    );
  }
}


export default App;
