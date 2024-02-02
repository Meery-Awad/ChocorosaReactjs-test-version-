import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import './Header.css'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/bootstrap.css';
import ShoppingCartList from './cartList/cartList'
import DropDown from "../../dropdown/dropDown";
import axios from "axios";


const Header = () => {

    const state = useSelector((state) => state.data);
    const { userlogIn, userConfirm, shoppingCart, cntCart, alertConfirm, setAlertConfirm,
        userList, setUserList, setConfirmSuccess, confirmSuccess, setUserConfirm,
        setShoppingCart, setTotalOfOrder, isChecked1, setIsChecked1, setIsChecked2, isChecked2, setcheckDeliveryWay, setErrDeliveryINFO, deliveryTextarea,
        setCntCart, setAlertLogIn, showCartList, setShowCartList, totalOfOrder, ProfileSelectOrder, setDeliveryTextarea,
        setContinueWithLogIn, setUserLogIn, selectedValue, setSelectedValue, contactNumber, setContactNumber, setCartListFromWhereOpen,
        setdropDownShowAll,
        CurrentUserId, GiftType, category } = useBetween(state.useShareState);



    const iconCloseBtnhandel = () => {

        let iconSearchBtn = document.getElementById("searchBtn");
        let iconCloseBtn = document.getElementById('closeBtn');
        let searchBox = document.getElementById('searchBoxBtn');
        let navigation = document.querySelector('.navigation');
        let iconMenuToggle = document.querySelector('.menuToggle');
        let header = document.querySelector('header');

        searchBox.classList.remove('active');
        iconCloseBtn.classList.remove('active');
        iconSearchBtn.classList.remove('active');
        iconMenuToggle.classList.remove('hide');

    }
    const iconMenuTogglehandel = () => {
        // let iconSearchBtn = document.getElementById("searchBtn");
        // let iconCloseBtn = document.getElementById('closeBtn');
        // // let searchBox = document.getElementById('searchBoxBtn');
        // let navigation = document.querySelector('.navigation');
        // let iconMenuToggle = document.querySelector('.menuToggle');
        let header = document.querySelector('header');

        header.classList.toggle('open');
        // searchBox.classList.remove('active');
        // iconCloseBtn.classList.remove('active');
        // iconSearchBtn.classList.remove('active');

    }
    const handelConfirmBuying = () => {
        const Date1 = new Date();
        // Extract day, month, and year
        const currentDate = Date1.getDate() + '/' + (Date1.getMonth() + 1) + '/' + Date1.getFullYear();


        const item = {
            _id: userList[0].userPackage.length + 1,
            userName: userConfirm[0] ? userConfirm[0].userName : "",
            userId: userConfirm[0] ? userConfirm[0]._id : "",
            userPhone: userConfirm[0] ? userConfirm[0].userPhone : "",
            shoppingCartList: shoppingCart,
            status: "Received",
            date: currentDate,
            total: totalOfOrder,
            emirate: selectedValue,
            delivery: deliveryTextarea,
            contactNumber: contactNumber,
            details: 'details',
        }
        const headers = {

            'Content-Type': 'multipart/form-data',
        };
        const user = [...userList];
        const formData = new FormData();

        var newArray;
        if (userConfirm.length != 0 && userConfirm[0].userPhone != 'Admin') {


            newArray = [...userConfirm[0].userPackage, item]


            user[CurrentUserId].userPackage = newArray;


            formData.append('newArray',  JSON.stringify(newArray));

        }
        // just send to the order list 

        formData.append('userId', item.userId);
        formData.append('userPhone', item.userPhone);

        const AdminPackage = [...userList[0].userPackage, item]

        user[0].userPackage = AdminPackage;

        formData.append('AdminPackage', JSON.stringify(AdminPackage));


        axios.post("http://localhost:5000/updateUser", formData, { headers }).then(() => {


            console.log('success')

        }).catch((err) => {
            console.log(err)

        })

        setUserList(user);

        setConfirmSuccess(true);
        setShoppingCart([])
        setTotalOfOrder(0);
        setCntCart(0)
        setIsChecked2(false);
        setIsChecked1(false);
        setContactNumber("");
        setSelectedValue(false);
        setDeliveryTextarea("")
        setTimeout(() => {
            setConfirmSuccess(false);
            setShowCartList(false);
            setAlertConfirm(false);


        }, 6000);
    }
    const handleBuying = () => {
        const regex1 = /[a-zA-Z]/;

        const hasCharacter1 = regex1.test(contactNumber)


        if (!isChecked1 && !isChecked2)
            setcheckDeliveryWay(true);

        else if ((deliveryTextarea == "" || selectedValue == "" ||
            hasCharacter1 == true || contactNumber.length != 10 || contactNumber[0] != '0' || contactNumber[1] != '5') && isChecked2 == false)
            setErrDeliveryINFO(true)

        else
            setAlertConfirm(true);
    }

    const path = useLocation();
    const navigate = useNavigate();


    const handelLogOut = () => {
        setContinueWithLogIn(false);
        setUserLogIn(false);
        setUserConfirm([])
        if (path.pathname == '/Profile');
        navigate('/HomePage', { replace: false });

    }


    return (

        <div className="Header" style={{ zIndex: 1 }}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />


            <header>
                <div className="firstSection">

                    <i href="" class="logo"></i>
                    <div onClick={() => { setShowCartList(true); setCartListFromWhereOpen('Header'); setdropDownShowAll(true) }} >
                        <div className="fa cntCart">{cntCart}</div>
                        <br />
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                </div>
                <div>
                    <div class="secondSection">
                        <ul class="navigation">
                            <NavLink to="/HomePage" onClick={() => setdropDownShowAll(true)} style={{ textDecoration: 'none' }}>
                                <li><a>Home</a></li>
                            </NavLink>
                            <li onClick={() => setdropDownShowAll(false)} >
                                <a >
                                    <DropDown data={{ dropDown: GiftType, id: "Occasions" }} />
                                </a></li>

                            <li onClick={() => setdropDownShowAll(false)}>
                                <a>
                                    <DropDown data={{ dropDown: category, id: "Categories" }} />
                                </a></li>
                            <NavLink to="/ContactUs" onClick={() => setdropDownShowAll(true)} style={{ textDecoration: 'none' }}>
                                <li><a >Contact</a></li>
                            </NavLink>

                            {!userlogIn ? <li onClick={() => { setAlertLogIn(true); setdropDownShowAll(true) }} className="logBtn"><a>Log in</a></li> : <li onClick={handelLogOut} className="logBtn"><a>Log out</a></li>}



                            {userlogIn &&
                                <li>
                                    <NavLink to="/Profile">
                                        <a onClick={() => setdropDownShowAll(true)}><i class="fa fa-user" aria-hidden="true" title={userConfirm[0].userName}></i></a>

                                    </NavLink>
                                </li>}
                        </ul>


                        {/* <i class="fa fa-search" name="search-outline" id="searchBtn" onClick={iconSearchBtnhandel}></i> */}
                        <i class="fa fa-navicon menuToggle" name="grid-outline" onClick={iconMenuTogglehandel}></i>
                    </div>
                    <div class="searchBox" id="searchBoxBtn">
                        <input type="text" name="" id="" placeholder="Search here..." />
                        <div class="icon">

                            <i class="fa fa-times" name="close-outline" id="closeBtn" onClick={iconCloseBtnhandel}></i>

                        </div>
                    </div>
                </div>
            </header>

            <Modal show={showCartList} onHide={() => { setShowCartList(false); setAlertConfirm(false); setConfirmSuccess(false) }} className='Model'>

                <Modal.Body>
                    <ShoppingCartList />
                </Modal.Body>
                {!confirmSuccess && <Modal.Footer dir="auto">
                    {(shoppingCart.length != 0 || ProfileSelectOrder.shoppingCartList) && <Button variant="primary" className="btn btn-calendar-modal-save"   >

                        {
                            path.pathname != '/Profile' ? !alertConfirm ? <span onClick={handleBuying}>Buying</span> : <span onClick={handelConfirmBuying}>Confirm</span>
                                : !alertConfirm ? <span onClick={handleBuying}>Buy again</span> : <span onClick={handelConfirmBuying}>Confirm</span>
                        }
                    </Button>
                    }
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                    >
                        {!alertConfirm ? <span onClick={() => setShowCartList(false)}> Continue shopping</span> : <span onClick={() => setAlertConfirm(false)}>Back to shopping cart</span>}
                    </Button>

                </Modal.Footer>
                }
            </Modal>


        </div >




    );
}

export default Header;