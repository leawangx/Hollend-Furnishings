import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from "reactjs-popup";
import {  Radio, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

class ProductsTable extends Component {
    state = {
        highlight: false,
        colorValue: "",
        materialValue: "",
        qty: 0,
    }

    onClickSC = async (product) => {
        const { colorValue, materialValue, qty } = this.state;
        const type = product.type;
        const name = product.name;
        const price = product.price;
        const url = product.url;
        const MFG = product.MFG;
        const data = {
            "type": type, 
            "name": name, 
            "price": parseInt(price), 
            "url": url, 
            "color": colorValue, 
            "material": materialValue, 
            "qty": parseInt(qty),
            "MFG": MFG,
        };
        console.log(data);
        const add = await Axios({
            method: 'POST',
            url: 'http://localhost:1337/shoppingcarts',
            data
        });
        if (add.status == 200) {
            alert("Item has successfully been added.")
        } else {
            alert("Something went wrong.")
        }
    }

    onChangeColor = e => {
        this.setState({
            colorValue: e.target.value,
        });
        // console.log(e.target.value)
    };

    onChangeMaterial = e => {
        this.setState({
            materialValue: e.target.value,
        });
        // console.log(e.target.value)
    };

    onChangeQty = value => {
        this.setState({
            qty: value,
        });
        // console.log('changed', value);
    };

    render() {
        const {products, selectedTypes, selectedPrice} = this.props;

        const type = selectedTypes.includes('All') ? ['Lounge', 'ErgonomicChairs', 'ClassroomChair','BarStool'] : selectedTypes;
        const relevantProducts = products.filter(se => type.includes(se.type) === true);

        (selectedPrice == '1') ? relevantProducts.sort((a, b) => (a.price > b.price) ? -1 : 1) 
                       : relevantProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);

        // const buttonClass = this.state.highlight ? "button-icon-sc-highlight" : "button-icon-sc";
        return (
            <div className="ProductsTable">
              {relevantProducts.map(product => {
      
                  return(
                          <div className="Product-card">
                              <div className="Product-card-img">
                                  <div className="img-wrapper">
                                      <img className="img" src={product.url}></img>
                                  </div>
                                  <div className="img-overlay">
                                        <Popup
                                            trigger={<div><FontAwesomeIcon icon="eye" className="button-icon-view" /></div>}
                                            modal
                                            closeOnDocumentClick
                                            contentStyle={{width: "90%", height: "min-content",borderRadius: "20px", border: "0px"}}
                                        >
                                            {close => (
                                                <div className="modal">
                                                    <a className="close" onClick={close}>&times;</a>
                                                    <div className="header"> Product Details </div>
                                                    <div className="content">
                                                        <div className="content-img-wrapper">
                                                            <div className="title-wrapper">
                                                                <div className="product-name"> { product.name} </div>
                                                                
                                                                <div className="title-type-wrapper">
                                                                    <p className="title-type">{product.type}</p>                                                                    
                                                                </div>
                                                            </div>
                                                            <img className="content-img" src={product.url}></img>
                                                        </div>
                                                        <div className="content-description-wrapper">
                                                            <p className="content-description-title">Description: </p>
                                                            <p className="content-description">\ MFG# {product.MFG} \   Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                                                            Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                                                            delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?</p>
                                                        </div>
                                                        <div className="content-choice-wrapper">
                                                            <p className="content-choice-title">Color: </p>
                                                            <div>
                                                                <Radio.Group onChange={ this.onChangeColor } value={ this.state.colorValue }>
                                                                    { getList(product.color).map((option) => {
                                                                        return(
                                                                            <Radio value={ option }>{ option }</Radio>
                                                                        )
                                                                    })}
                                                                </Radio.Group>
                                                            </div>
                                                            <p className="content-choice-title">Material: </p>
                                                            <div>
                                                                <Radio.Group onChange={ this.onChangeMaterial } value={ this.state.materialValue }>
                                                                    {getList(product.material).map((option) => {
                                                                        return(
                                                                            <Radio value={ option }>{ option }</Radio>
                                                                        )
                                                                    })}
                                                                </Radio.Group>
                                                            </div>
                                                            <p className="content-choice-title">Quantity: </p>
                                                            <div className="site-input-number-wrapper">
                                                                <InputNumber min={0} max={100000} defaultValue={0} onChange={this.onChangeQty} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="add" onClick={ () => this.onClickSC(product) }><FontAwesomeIcon icon="shopping-cart" className="button-icon-sc" /></div>
                                                </div>
                                            )}
                                        </Popup>
                                  </div>
                              </div>
                              
                              <div className="Product-card-text-type">
                                  <p className="Product-card-text-type-p">{product.type}</p>
                              </div>
      
                              <div className="Product-card-text">
                                  <div className="Product-card-text-name">{product.name}</div>
                                  <div className="Product-card-text-price">${product.price}</div>
                              </div>
                              <p className="Product-card-MFG">MFG#{product.MFG}</p>
                          </div>
                  )
      
              })}
            </div>
        );
    }
  }

  function getList(s) {
        const l = s.split(',');
        return l;
  }
  
  export default ProductsTable;