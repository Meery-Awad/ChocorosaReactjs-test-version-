import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import './cartList.css'
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { Buffer } from 'buffer';

const ShoppingCartList = () => {

    const state = useSelector((state) => state.data);

    const { logIn, shoppingCart, setShoppingCart, totalOfOrder, setcheckDeliveryWay
        , isChecked1, setIsChecked1, isChecked2, setIsChecked2, deliveryTextarea, setDeliveryTextarea,
        checkDeliveryWay, deleteItemFromArray, setShowCartList, alertConfirm, confirmSuccess, CartListFromWhereOpen,
        ProfileSelectOrder, selectedValue, setSelectedValue, errDeliveryINFO, setErrDeliveryINFO, userConfirm
        , contactNumber, setContactNumber,
    } = useBetween(state.useShareState);





    const path = useLocation();


    var array;
    if (CartListFromWhereOpen == 'Profile')
        array = ProfileSelectOrder.shoppingCartList;
    else array = shoppingCart


    const handleCheckboxChange1 = () => {

        setcheckDeliveryWay(false);
        setIsChecked1(!isChecked1);
        setIsChecked2(false)

    }
    const handleCheckboxChange2 = () => {
        setcheckDeliveryWay(false);
        setIsChecked1(false);
        setIsChecked2(!isChecked2)

    }
    var CartListCont = array.length ? array.map((item, i) => {
        var img = null;
                     
        if (item.photo.data) {
           
            const base64String = Buffer.from(item.photo.data).toString('base64');
          
            img = `data:image/*;base64,${base64String}`
            
        }
        return (

            item.cnt > 0 && <div key={item._id}>


                <div className="categoryType">

                    <NavLink to='/Item' state={{ id: item._id, category: item }} style={{ textDecoration: "none" }}>
                        <img src={img} onClick={() => { setShowCartList(false) }}></img>
                    </NavLink>
                    <div className="details">
                        <div className="name">{item.name1}</div>
                        <div className="category">{item.category}</div>
                        <div className="price">{item.price} ADE</div>
                        <div className="quntity">
                            {CartListFromWhereOpen != 'Profile' && <span className="process" onClick={() => { item.cnt == 1 ? deleteItemFromArray(shoppingCart, setShoppingCart, item) : logIn(item, -1) }}>-</span>}
                            <span className="quntityCont">{item.cnt}</span>
                            {CartListFromWhereOpen != 'Profile' && <span className="process" onClick={() => logIn(item, 1)} >+</span>}
                        </div>


                    </div>
                    {CartListFromWhereOpen != 'Profile' && <i class='fas fa-trash' title="delete" onClick={() => deleteItemFromArray(shoppingCart, setShoppingCart, item)}></i>}
                </div>



            </div>

        )
    }) : <p></p>
    const inputOrderDetails = (e) => {
        setDeliveryTextarea(e.target.value)
        ErrDeliveryINFO()
    }

    const handleDropdownChange = (e) => {
        setSelectedValue(e.target.value);
        ErrDeliveryINFO()

    }
    const handleContactNumber = (e) => {

        setContactNumber(e.target.value)
        ErrDeliveryINFO()
    }
    const ErrDeliveryINFO = () => {
        setErrDeliveryINFO(false)
    }
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />

            {!alertConfirm && <div className="ShoppingCartList">

                {CartListCont}
                <br></br>

                {array.length != 0 && <div>
                    {checkDeliveryWay &&
                        <div style={{ color: 'red' }}> *Please check the way of receipt </div>}
                    <div className="checkboxCont">

                        <div className="checkbox">
                            {CartListFromWhereOpen != 'Profile' && <input
                                type="checkbox"
                                checked={isChecked1}
                                onChange={handleCheckboxChange1}
                            />
                            }
                            {CartListFromWhereOpen == 'Profile' && <input
                                type="checkbox"
                                checked={ProfileSelectOrder.delivery =="" ? false : true}

                                disabled={true}
                            />
                            }
                            <label> With Delivery</label>
                        </div>
                        <div className="checkbox">
                            {CartListFromWhereOpen != 'Profile' && <input
                                type="checkbox"
                                checked={isChecked2}
                                onChange={handleCheckboxChange2}
                            />
                            }
                            {CartListFromWhereOpen == 'Profile' && <input
                                type="checkbox"
                                checked={ProfileSelectOrder.delivery == "" ? true : false}

                                disabled={true}
                            />
                            }
                            <label> Store Pickup </label>
                        </div>
                    </div>
                </div>
                }
                <br />
                {isChecked1 && CartListFromWhereOpen != 'Profile'&& <form style={{ width: '90%', margin: 'auto' }}>

                    {errDeliveryINFO && <div className='errTextareaLocation' style={{ color: 'red' }}>*Please enter all information correctly </div>}
                    <br />

                    {/* Dropdown component */}
                    <label for="emirates">The Emirate : </label><br /><br />
                    <select value={selectedValue} onChange={handleDropdownChange} className="selectEmirate">
                        <option value="">Select the Emirate</option>
                        <option value="Abu Dhabi" className="option">Abu Dhabi</option>
                        <option value="Dubai" className="option">Dubai</option>
                        <option value="Sharjah" className="option">Sharjah</option>
                        <option value="Ajman" className="option">Ajman</option>
                        <option value="Umm Al Quwain" className="option">Umm Al Quwain</option>
                        <option value="Ras Al Khaimah" className="option">Ras Al Khaimah</option>
                        <option value="Fujairah" className="option">Fujairah</option>



                    </select>

                    <br /><br />


                    <label>Delivery location :</label><br />
                    <textarea type="text" id="Delivery-location" placeholder="Please enter the location details or the location link..." name='userLocation' value={deliveryTextarea} onChange={inputOrderDetails}
                    />
                    <br /><br />

                    <label>Contact Number :</label> <br /><br />

                    <input type="text" placeholder="05XXXXXXXX" className="contactNumber"
                        onChange={handleContactNumber}
                        value={userConfirm[0] ? userConfirm[0].userPhone : contactNumber}>

                    </input>

                    <br /><br />

                </form>
                }
                {(isChecked2 || CartListFromWhereOpen == 'Profile')  &&
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <h4> Our location : </h4> <div style={{ color: "#888" }}> Abu Saif Business Center - Alkazim Building <br />
                            Floor :M <br />
                            Office: 06
                        </div>  <a href="https://maps.app.goo.gl/R7PYk4FhAozvR8Wb7" target="_blank"> go to our location </a>
                        <br /><br />
                    </div>

                }
                {CartListFromWhereOpen == 'Profile' && ProfileSelectOrder.delivery != "" && <form>
                    <label for="emirates">The Emirate : </label><br /><br />
                    <select value={ProfileSelectOrder.emirate} className="selectEmirate" disabled="false">
                        <option value={ProfileSelectOrder.emirate}>{ProfileSelectOrder.emirate}</option>
                    </select>
                    <br /><br />


                    <label>Delivery location :</label><br />
                    <textarea type="text" id="Delivery-location"
                        placeholder="Please enter the location details or the location link..." name='userLocation'
                        value={deliveryTextarea} onChange={inputOrderDetails}
                        disabled="true"
                    />
                    <br /><br />

                    <label>Contact Number :</label> <br /><br />

                    <input type="text" placeholder="05XXXXXXXX" className="contactNumber"
                        onChange={handleContactNumber}
                        value={userConfirm[0] ? userConfirm[0].userPhone : contactNumber} disabled="true">


                    </input>

                    <br /><br />
                </form>
                }
                <div className="total">total : {CartListFromWhereOpen == 'Profile' ? ProfileSelectOrder.total : totalOfOrder} AED</div>
            </div >
            }
            {
                alertConfirm && confirmSuccess == false &&
                <div className="BuyingAlert">Do you want to confirm your purchase?</div>

            }
            {
                confirmSuccess == true &&
                <div class="main-container">
                    <div class="check-container">
                        <div class="check-background">
                            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="check-shadow"></div>
                    </div>
                    <p>Your request has been sent to us successfully.<br />
                        You will receive a message on your phone when the order is prepared</p>
                </div>
            }


        </>



    );
}

export default ShoppingCartList;