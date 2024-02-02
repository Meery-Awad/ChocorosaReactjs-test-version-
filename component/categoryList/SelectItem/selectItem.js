import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import '../../HomePage/HomePage.css'
import './selectItem.css'
import { useLocation, useNavigate } from "react-router-dom";
import AlertLogIn from "../../logInPage/alertLogIn/alertLogIn";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddItem from "../../HomePage/addItem/addItem";
import axios from "axios";
import { Buffer } from 'buffer';
import '../../HomePage/addItem/addItem.css'


const Selectstate = (props) => {

    const state1 = useSelector((state) => state.data);

    const { logIn, continueWithLogIn, userlogIn, arrayAllItem, setArrayAllItem, setEditOrAdd, EditIndex, addItemInfo,
        setAddItemInfo, setEditIndex, colorsArray , setColorsArray } = useBetween(state1.useShareState);
    const [showEdite, setShowEdite] = useState(false)

    const location = useLocation();
    const { state } = location;

    const item = state.category



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [cnt, setCnt] = useState(1);

    const showCheck = (itemid) => {
        const showCheck = document.querySelector(`.check${itemid}`);
        if (continueWithLogIn == true || userlogIn == true) {

            showCheck.style.display = 'block'
        }
        setTimeout(function () {
            showCheck.style.display = 'none'
        }, 1500);

    }
    useEffect(() => {
        window.scrollTo(0, 0)


    }, [])


    const [isItemHere, setIsItemHere] = useState(true)
    const [showDeleteItem, setShowDeleteItem] = useState(false);

    const handleDeleteItem = () => {

        setArrayAllItem(arrayAllItem.filter(item1 => item1._id !== item._id))
        setShowDeleteItem(false);
        setIsItemHere(false)

        axios.post('http://localhost:5000/deleteItem', { data: item })
            .then(res => {
                console.log('success')

            }).catch((err) => {
                console.log(err)
            });


    }

    const handleEditItem = () => {


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
        formData.append('_id', arrayAllItem[EditIndex]._id);

        const newArray = [...arrayAllItem];
        newArray[EditIndex] = addItemInfo;

        // Set the state with the new array
        setArrayAllItem(newArray);

        const headers = {

            'Content-Type': 'multipart/form-data',
        };




        axios.post('http://localhost:5000/updateItems', formData, { headers }).then(() => {

            <div></div>

        }).catch((err) => {
            console.log(err)
        });



        setShowEdite(false);
        // setEditIndex(-1)


    }
    const [img, setImg] = useState(null)


    useState(() => {
        if (item.photo.data) {

            const base64String = Buffer.from(item.photo.data).toString('base64');

            setImg(`data:image/*;base64,${base64String}`)

        }

    }, [])
    
    const selectedColorList = addItemInfo.colorArray.length != 0 ? addItemInfo.colorArray.map((item1, i) => {

        return (
          

                <span  key={i} className='selectedColor'>{item1.colorName} </span>
           
        )
    }) : <p></p>
   
    useEffect(() => {

        setAddItemInfo((lastValue) => {

            return {
                ...lastValue,

                photo: arrayAllItem[state.typeId].photo,
                price: arrayAllItem[state.typeId].price,
                name: arrayAllItem[state.typeId].name,
                name1: arrayAllItem[state.typeId].name1,
                description: arrayAllItem[state.typeId].description,
                description1: arrayAllItem[state.typeId].description1,
                category: arrayAllItem[state.typeId].category,
                occasions: arrayAllItem[state.typeId].occasions,
                colorArray:colorsArray.length==0 ? arrayAllItem[state.typeId].colorArray : colorsArray,
                _id: arrayAllItem[state.typeId]._id,
            }
        });
       

    }, [arrayAllItem])

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />


            <div className="selectstate">

                {isItemHere == true &&
                    <div>
                        <div className="categoryTypeCont categoryType">

                            <img src={img}></img>

                            <div className="details">
                                <div className="deleteAndEdit">
                                    <i className="fas fa-pen" title="Edit"
                                        onClick={() => {

                                            setEditOrAdd('Edit');
                                            setEditIndex(state.typeId);
                                            setShowEdite(true)

                                        }}></i>
                                    <i className="fa fa-trash" aria-hidden="true" title="delete" onClick={() => setShowDeleteItem(true)}></i>
                                </div>
                                <div className="name">{addItemInfo.name1}</div>
                                <div className="category">{addItemInfo.category}</div>
                                <div className="price">{addItemInfo.price} ADE </div>
                                <div className="description" title={addItemInfo.description}>{addItemInfo.description} </div>
                                <div className='selectedColorList' >
                                    {selectedColorList}
                                </div>
                                <div className="quntity">
                                    <span className="process" onClick={() => cnt > 1 ? setCnt(cnt - 1) : setCnt(cnt)}>-</span>
                                    <span className="quntityCont">{cnt}</span>
                                    <span className="process" onClick={() => setCnt(cnt + 1)} >+</span>
                                </div>
                                <div className="addToCard" onClick={() => { logIn(item, cnt); showCheck(item._id) }}>Add to card <i class={`fa fa-check check${item._id}`} aria-hidden="true"></i></div>
                                <div>
                                    <div className="phrase"> A gift is a measure of love, and because we feel love for our customers, we provide great prices, so give something that expresses you in a unique and distinctive way.</div>
                                </div>

                            </div>

                        </div>
                    </div>
                }
                {
                    isItemHere == false && <span className="afterDelete" style={{ border: 'none' }}>The item no longer exists... </span>
                }
                <AlertLogIn />
                <Modal show={showDeleteItem} onHide={() => { setShowDeleteItem(false) }} className='Model'>

                    <Modal.Body className="confirmDelete">
                        Are you sure to delete this item?
                    </Modal.Body>

                    <Modal.Footer dir="auto">
                        <Button variant="primary" className="btn btn-calendar-modal-save" onClick={handleDeleteItem}>
                            Delete
                        </Button>

                        <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        >
                            <span onClick={() => setShowDeleteItem(false)}> Close </span>
                        </Button>


                    </Modal.Footer>

                </Modal>

                <Modal show={showEdite} onHide={() => { setShowEdite(false) }} className='Model'>

                    <Modal.Body>
                        <AddItem />
                    </Modal.Body>

                    <Modal.Footer dir="auto">
                        <Button variant="primary" className="btn btn-calendar-modal-save" onClick={handleEditItem}>
                            Edit
                        </Button>

                        <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        >
                            <span onClick={() => setShowEdite(false)}>  Close </span>
                        </Button>

                    </Modal.Footer>

                </Modal>

            </div>


        </>



    );
}

export default Selectstate;