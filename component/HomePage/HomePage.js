import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './HomePage.css'
import axios from "axios";
import OurNew from "./ourNew/ourNew";
import Category from "./category/category";
import { useBetween } from "use-between";
import { NavLink, useNavigate } from "react-router-dom";
import AlertLogIn from '../logInPage/alertLogIn/alertLogIn'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddItem from "./addItem/addItem";
import { Buffer } from 'buffer';



const HomePage = () => {

    // <get the data from rducers>

    const state = useSelector((state) => state.data);

    const { GiftType, setCategoryId, logIn, setCategoryOption, continueWithLogIn, userlogIn,
        userConfirm, addItemInfo, setdropDownShowAll, arrayAllItem, setArrayAllItem, showAddItem, setShowAddItem, setEditIndex
        , setEditOrAdd
    } = useBetween(state.useShareState);


    const navigate = useNavigate();

    const navigateToCategory = (i) => {

        setCategoryId(i)
        setCategoryOption(2)
        navigate('/CategoryList', { replace: false });
    }

    const showCheck = (itemid) => {

        const showCheck = document.querySelector(`.check${itemid}`);
        if (continueWithLogIn == true || userlogIn == true) {

            showCheck.style.display = 'block'
        }
        setTimeout(function () {
            showCheck.style.display = 'none'
        }, 1500);

    }


    const GiftTypeCont = GiftType.length != 0 ? GiftType.map((item, i) => {


        return (
            <div>
                <div className="title1"> {item.type}</div>
                <div className="array">
                    {arrayAllItem.length != 0 ? arrayAllItem.map((item1, i1) => {
                        var img = "";
                        if (item1.photo) {
                            if (item1.photo.data) {

                                const base64String = Buffer.from(item1.photo.data).toString('base64');

                                img = `data:image/*;base64,${base64String}`

                            }
                        }

                        return (

                            item1.occasions == item.type && <div key={item1._id}>


                                <div className="categoryType">
                                    <NavLink to='/Item' state={{ id: item._id, category: item1, typeId: i1 }} style={{ textDecoration: "none" }}>
                                        <img src={img}></img>
                                        <div className="details">
                                            <div className="name">{item1.name1}</div>
                                            <div className="price">{item1.price} ADE</div>

                                        </div>
                                    </NavLink>
                                    <div className="details">
                                        <div className=" addToCard" onClick={() => { logIn(item1); showCheck(item1._id) }}>Add to card <i class={`fa fa-check check${item1._id}`} aria-hidden="true"></i></div>
                                    </div>
                                </div>

                                <div className="showMore" onClick={() => navigateToCategory(item.type)}>show more</div>

                            </div>

                        )

                    }) : <p style={{ color: '#EF9898', textAlign: 'center', width: "80%" }}>No Items Yet!!</p>}
                </div>

            </div >

        )
    }) : <p></p>
    // console.clear()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {

        const items = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/Items', {
                    responseType: 'json' // Ensure binary data is handled correctly

                })

                setArrayAllItem(data.data)

            }
            catch (error) {
                console.log(error)
            }

        }
        items();


    }, [arrayAllItem.length, arrayAllItem])

    const handelAddItem = () => {


        setArrayAllItem([...arrayAllItem, addItemInfo]);

        const headers = {

            'Content-Type': 'multipart/form-data',
        };


        const formData = new FormData();

        formData.append('name', addItemInfo.name);
        formData.append('name1', addItemInfo.name1);
        formData.append('description', addItemInfo.description);
        formData.append('description1', addItemInfo.description1);
        formData.append('category', addItemInfo.category);
        formData.append('occasions', addItemInfo.occasions);
        formData.append('price', addItemInfo.price);
        formData.append('photo', addItemInfo.photo);
        formData.append('colorArray', JSON.stringify(addItemInfo.colorArray));

        axios.post("http://localhost:5000/Items", formData, { headers }).then(() => {


            console.log('success')

        }).catch((err) => {
            console.log(err)

        })


        setShowAddItem(false)
        setEditIndex(-1)
    }
    useEffect(() => {
        setdropDownShowAll(true)
    }, []);
    return (
        <>
            <div style={{ zIndex: 0 }} className="HomePage" onClick={() => setdropDownShowAll(true)}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />


                <div className="AddAndWhatsAppSect">


                    <div className='whatsappImg'>
                        <a href="whatsapp://send?abid=00971544330331" >
                            <img src="https://i.pinimg.com/originals/e2/3a/c5/e23ac562fab019a572cf6d6526f0ef98.png" />
                        </a>
                    </div>
                    {userConfirm.length != 0 ? userConfirm[0].userPhone == "Admin" && <div className="add" onClick={() => { setEditOrAdd('Add'); setShowAddItem(true) }}><i class="fa fa-plus" aria-hidden="true"></i></div> : <div></div>}
                    <Modal show={showAddItem} onHide={() => { setShowAddItem(false) }} className='Model'>

                        <Modal.Body>
                            <AddItem />
                        </Modal.Body>

                        <Modal.Footer dir="auto">
                            <Button variant="primary" className="btn btn-calendar-modal-save" onClick={handelAddItem}>
                                Add
                            </Button>

                            <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                            >
                                <span onClick={() => setShowAddItem(false)}>  Close </span>
                            </Button>

                        </Modal.Footer>

                    </Modal>
                </div>
                <div className="titleHomePage">
                    <h2>ChocoRosa</h2>
                    <br />
                    <div>A shop for making all kinds of bouquets of roses , chocolates , and gifts In addition to the delivery service within the UAE in a refrigerated way</div>

                </div>
                <br />
                <div className="titleHomePage">
                    <a href="tel:00971544330331" className="telUs" >📞</a> If you would like to prepare your own gift, call us:  <a href="tel:00971544330331" className="number" > 00971544330331</a>
                </div>
                <OurNew />
                <br /><br /><br />
                <Category />
                <div className="categoryTypeCont">

                    {GiftTypeCont}
                </div>
                <AlertLogIn />

            </div >


        </>



    );
}


export default HomePage;