import { useSelector } from "react-redux";
import Header from "../Header/Header";

import { useBetween } from "use-between";
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddProducts from "./AddProducts/AddProducts";
import '../../../src/component/css/bootstrap.css'
import './goods.css'
import WOW from 'wowjs';
import '../css/animate.css'
import AlertSuccess from "../AlertSuccess/AlertSuccess";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Buffer } from 'buffer';




const Goods = () => {
    const state = useSelector((state) => state.data);

    const { Goods, setGoods, ProductInfo, setProductInfo, addOrEdit, setAddOrEdit, indexEdit, setIndexEdit
        , indexDelete, setIndexDelete, adminLogIn } = useBetween(state.useShareState);
    const [noProducts, setNoProducts] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [AlertDelete, setAlertDelete] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false)

    const state1 = useSelector((state) => state.data1);

    const { lang, arraylang } = useBetween(state1.useShareState);

    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, [])

    function myFunction1() {
        // Declare variables 
        var input, filter, table, tr, td, i, product;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");


        tr = table.getElementsByTagName("tr");
        product = table.getElementsByTagName("span");

        var cnt = 0;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];


            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    product[i].style.display = "";
                } else {
                    product[i].style.display = "none";
                    cnt++;
                }
            }

            if (cnt == product.length) setNoProducts(true);
            else setNoProducts(false)
        }
    }
   
    const addNewProduct = () => {
       
        setGoods([...Goods, ProductInfo]);
        const headers = {

            'Content-Type': 'multipart/form-data',
        };


        const formData = new FormData();

        formData.append('ProductType', ProductInfo.ProductType);
        formData.append('text', ProductInfo.text);
        formData.append('price', ProductInfo.price);
        formData.append('photo', ProductInfo.photo);
        formData.append('date', ProductInfo.date);



        axios.post("https://realluxs.onrender.com/Goods", formData, { headers }).then(() => {


            console.log('success')

        }).catch((err) => {
            console.log(err)

        })



        if (Goods.length > 0) {
            const addProd = document.querySelector(`.product`);

            addProd.classList.add("addProductZoom");
            setTimeout(() => {
                addProd.classList.remove("addProductZoom");
            }, 1000)

            // setTimeout( window.location.reload (),10000);

        }


    }
    const addOrEditProduct = () => {

        emptyFile()
        if (addOrEdit == 'Add') addNewProduct();
        else if (addOrEdit == 'Edit') {
            SaveEditProduct();

        }
        emptyFile();


    }
    const emptyFile = () => {

        setAddProduct(false);

        setProductInfo((lastValue) => {
            return {
                ...lastValue,

                ProductType: "",
                date: "",
                text: "",
                photo: null,
                price: ""
            }
        });





    }
    const SaveEditProduct = () => {


        const formData = new FormData();
        formData.append('ProductType', ProductInfo.ProductType);
        formData.append('text', ProductInfo.text);
        formData.append('price', ProductInfo.price);
        formData.append('photo', ProductInfo.photo);
        formData.append('date', ProductInfo.date);
        formData.append('_id', Goods[indexEdit]._id);
       
        setGoods(proves => {
            const newState = [...proves]


            newState[indexEdit].ProductType = ProductInfo.ProductType;
            newState[indexEdit].text = ProductInfo.text;
            newState[indexEdit].photo = ProductInfo.photo.data;
            newState[indexEdit].price = ProductInfo.price;

            return newState
        })
        const headers = {

            'Content-Type': 'multipart/form-data',
        };




        axios.post('https://realluxs.onrender.com/updateGood', formData, { headers }).then(() => {


            setSuccessAlert(true)
            setTimeout(() => {
                setSuccessAlert(false)
            }, 2000)

        }).catch((err) => {
            console.log(err)
        });


    }
    const editProduct = (i) => {

        setAddProduct(true);
        setIndexEdit(i)

        setProductInfo((lastValue) => {
            return {
                ...lastValue,

                ProductType: Goods[i].ProductType,
                text: Goods[i].text,
                price: Goods[i].price,
                photo: Goods[i].photo,
                date: Goods[i].data,
                img: ""

            }
        });




    }
    const Delete = async () => {



        const deleteProd = document.querySelector(`.product`);

        deleteProd.classList.add("deleteProduct");
        setGoods(Goods.filter(item => item !== indexDelete));
        setAlertDelete(false)
        setTimeout(() => {
            deleteProd.classList.remove("deleteProduct");
        }, 1000)
        await axios.post('https://realluxs.onrender.com/deleteGoods', { data: indexDelete })
            .then(res => {
                console.log('success')

            }).catch((err) => {
                console.log(err)
            });



    }

    const location = useLocation();

    try {
        var GoodsList = Goods.length ? Goods.toReversed().map((item, i) => {
            var img = "";
            console.log(item.text)

            if (item.photo) {

                const base64String = Buffer.from(item.photo.data).toString('base64');

                img = `data:image/*;base64,${base64String}`
            }

            return (


                <span className="product wow fadeInDown" data-wow-duration='1s' id="product" key={i} style={{ textAlign: lang=='en' ? 'left' : 'right'}}>

                    <img src={img} />
                  
                    <div style={{ display: 'flex' }}>
                        <div title={item.ProductType} className="h1">{item.ProductType == "" ? '-' : item.ProductType}</div>
                        {adminLogIn == true && <div className="icon">
                            <i className="fa fa-edit" title="Edit" onClick={() => { editProduct(Goods.length - i - 1); setAddOrEdit('Edit') }}></i>
                            <i className="fa fa-trash" aria-hidden="true" title="Delete" onClick={() => { setIndexDelete(item); setAlertDelete(true); setIndexEdit(i) }}></i>
                        </div>
                        }
                    </div>

                    <i className="date">{item.date}</i>

                    <div className="productText" title={item.text}>{item.text == "" ? '-' : item.text}</div>


                    <div className="price">
                        {item.price} {arraylang[3].AED}
                    </div>


                </span>


            )
        }) : <div></div>
    }
    catch (err) {
        console.log("")
    }

    useEffect(() => {

        const GoodsData = async () => {
            try {
                const { data } = await axios.get('https://realluxs.onrender.com/Goods', {
                    responseType: 'json' // Ensure binary data is handled correctly

                })

                console.log(data)
                setGoods(data.data)



            }
            catch (error) {
                console.log(error)
            }

        }
        GoodsData();


    }, [Goods.length,Goods])

    return (
        <>
          
            <Header />
            <div className="Goods" style={{ direction : lang== 'en' ? 'ltr' : 'rtl'} } >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
                {
                    AlertDelete &&
                    <div className="AlertDeleteCont">

                        <div className="AlertContMessg">
                            <h2>{arraylang[11].Confirm}</h2>
                            <div className="btn"><span className="deleteBtn" onClick={Delete}>{arraylang[11].Delete}</span> <span className="deleteClose" onClick={() => setAlertDelete(false)}>{arraylang[11].Close}</span></div>

                        </div>
                    </div>


                }


                {successAlert == true &&
                    <AlertSuccess />
                }

                <div className="search" >
                    <input type="text" placeholder={arraylang[3].Search} id="myInput" onChange={myFunction1} /> <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                {adminLogIn == true && <div className="addBtn" title="Add an Item" onClick={() => { setAddProduct(true); setAddOrEdit('Add') }}>+</div>}

                {(Goods.length == 0 || noProducts == true) && <p className="No-Products">{arraylang[3].No_Goods}</p>}
                <div>
                    <div id="myTable" className="products">

                        {GoodsList}

                        <Footer />
                    </div>

                </div>





                <Modal show={addProduct} onHide={() => setAddProduct(false)} size='lg' >

                    <Modal.Body>
                        <AddProducts props={'-1'} />
                    </Modal.Body>
                    <Modal.Footer dir="auto">
                        <Button variant="primary" className="btn btn-calendar-modal-save"
                            onClick={addOrEditProduct}
                        >
                            {addOrEdit == 'Add' ? arraylang[3].AddBtn : arraylang[3].EditBtn}
                        </Button>
                        <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                            onClick={emptyFile} >
                           {arraylang[3].CloseBtn}
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>

        </>



    );
}

export default Goods;