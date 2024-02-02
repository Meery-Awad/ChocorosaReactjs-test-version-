import axios from "axios";
import { useEffect, useState } from "react";



const reminders = (state = [], action) => {

    //  here we should replace all this data by data from backEnd


    const useShareState = () => {
        const [shoppingCart, setShoppingCart] = useState([]);
        const [showCartList, setShowCartList] = useState(false);

        const [cntCart, setCntCart] = useState(0);
        const [totalOfOrder, setTotalOfOrder] = useState(0);
        const [alertConfirm, setAlertConfirm] = useState(false);
        const [CurrentUserId, setCurrentUserId] = useState(-1)
        const [isChecked2, setIsChecked2] = useState(false);
        const [isChecked1, setIsChecked1] = useState(false);
        const [alertLogIn, setAlertLogIn] = useState(false);
        const [goToLogIn, setGoToLogIn] = useState(false);
        const [userlogIn, setUserLogIn] = useState(false);
        const [confirmSuccess, setConfirmSuccess] = useState(false);
        const [showAddItem, setShowAddItem] = useState(false);
        const [dropDownShowAll, setdropDownShowAll] = useState(false);
        const [Orders, setOrders] = useState([]);
        const [categoryId, setCategoryId] = useState(0);
        const [ProfileSelectOrder, setProfileSelectOrder] = useState({});
        const [selectOption, setSelectOption] = useState("");
        const [contactNumber, setContactNumber] = useState("")
        const [userConfirm, setUserConfirm] = useState([])
        const [continueWithLogIn, setContinueWithLogIn] = useState(false)
        const [categoryOption, setCategoryOption] = useState(0)
        const [checkDeliveryWay, setcheckDeliveryWay] = useState(false)
        const [deliveryTextarea, setDeliveryTextarea] = useState("")
        const [selectedValue, setSelectedValue] = useState(false);
        const [errDeliveryINFO, setErrDeliveryINFO] = useState(false);
        const [CartListFromWhereOpen, setCartListFromWhereOpen] = useState("");
        const [EditOrAdd, setEditOrAdd] = useState('Add')
        const [EditIndex, setEditIndex] = useState(-1)
        const [colorsArray, setColorsArray] =useState([])




        const category = [{
            _id: 0,
            type: "FLOWERS",
            color: "rgb(221, 148, 215)"


        },
        {
            _id: 7,
            type: "FlOWER BOUQUET ",
            color: ""
        },
        {
            _id: 8,
            type: "Flowers in the Basket",
            color: "rgb(216, 216, 144)"
        },
        {
            _id: 1,
            type: "FLOWERS & GIFTS",
            color: "rgb(112, 112, 190)",

        },
        {
            _id: 2,
            type: "FLOWERS IN VASES",
            color: "rgb(139, 204, 182)",


        },
        {
            _id: 3,
            type: "FLOWERS & CHOCOLATE",
            color: "rgb(219, 208, 111)",

        },
        {
            _id: 4,
            type: "CHOCOLATE",
            color: "rgb(233, 171, 77)",



        },
        {
            _id: 5,
            type: "CHOCOLATE & GIFTS",
            color: "rgb(129, 215, 226)",

        },
        {
            _id: 6,
            type: "GIFTS",
            color: "#699fe6",

        },


        ]
        const GiftType = [
            {
                _id: 5,
                type: "Valentine's Day"
            },
            {
                _id: 4,
                type: "Birthdays"
            },

            {
                _id: 0,
                type: "Gifts",

            },
            {
                _id: 1,
                type: "National day",

            },
            {
                _id: 2,
                type: "Women's Day",

            },
          

        ]

        const [arrayAllItem, setArrayAllItem] = useState([
          
        ]);

        const [addItemInfo, setAddItemInfo] = useState({
            _id:0,
            photo: null,
            price: "",
            name: "",
            name1: "",
            description: "",
            description1: "",
            category: category[0].type,
            occasions: GiftType[0].type,
            colorArray: [],

        });
      
        const [userList, setUserList] = useState([

        ])
     

        const [userInfo, setuserInfo] = useState({
           
            userName: "",
            userPhone: "",
            userPassword: "",
            userConfirmPassword: "",
            userPackage: [],

        });
        const ItemColor = [

            { _id: 0, colorName: "Select Color" },
            { _id: 1, colorName: "red" },
            { _id: 2, colorName: "white" },
            { _id: 3, colorName: "pink" },
            { _id: 4, colorName: "yellow" },
            { _id: 5, colorName: "green" },
            { _id: 6, colorName: "black" }
        ]

        
        const handelAddToCart = (newItem, cnt) => {

            if (cnt == undefined || cnt == 0) {
                cnt = 1
            }
            const filteredCartList = shoppingCart.filter((item) => {
                const id = item._id;

                return id == newItem._id;
            })

            setShoppingCart(filteredCartList);



            //if the item have add to the first time 
            if (filteredCartList.length == 0) {

                const newArray = [...shoppingCart, newItem];

                setShoppingCart(newArray);
                setCntCart(cntCart + cnt)
                newItem.cnt = cnt;


            }
            // else
            else {
                const newArray = shoppingCart.map(item => {
                    if (item._id === newItem._id) {
                        // Update the value of the specific item

                        setCntCart(cntCart + cnt)
                        return { ...item, cnt: item.cnt + cnt };


                    }
                    return item;
                });

                // Update the state with the new array

                setShoppingCart(newArray);
            }


            setTotalOfOrder(totalOfOrder + (cnt * newItem.price))


        }
        const deleteItemFromArray = (myArray, setMyArray, itemToDelete) => {

            const newArray = myArray.filter(item => item !== itemToDelete);
            setTotalOfOrder(totalOfOrder - (itemToDelete.cnt * itemToDelete.price))
            // Update the state with the new array
            setMyArray(newArray);
            setCntCart(cntCart - itemToDelete.cnt)
        };

       
        const logIn = (item, cnt) => {

            if (continueWithLogIn == true) handelAddToCart(item, cnt);
            else if (userlogIn == false) { setAlertLogIn(true); }
            else handelAddToCart(item, cnt)
        }




        const [colorOfCategory, setColorOfCategory] = useState(
            [{ _id: 0, color: "red", color1: "" },
            { _id: 1, color: "pink" },
            { _id: 2, color: "white" },
            { _id: 3, color: "black" }
            ]
        )






        return {

            category,
            GiftType,
            categoryId, setCategoryId,
            colorOfCategory, setColorOfCategory,
            userList, setUserList,
            alertLogIn, setAlertLogIn,
            userlogIn, setUserLogIn,
            goToLogIn, setGoToLogIn,
            userInfo, setuserInfo,
            userConfirm, setUserConfirm,
            arrayAllItem, setArrayAllItem,
            shoppingCart, setShoppingCart,
            continueWithLogIn, setContinueWithLogIn,
            cntCart, setCntCart,
            alertConfirm, setAlertConfirm,
            confirmSuccess, setConfirmSuccess,
            totalOfOrder, setTotalOfOrder,
            showCartList, setShowCartList,
            ProfileSelectOrder, setProfileSelectOrder,
            CurrentUserId, setCurrentUserId,
            categoryOption, setCategoryOption,
            selectOption, setSelectOption,
            isChecked2, setIsChecked2,
            isChecked1, setIsChecked1,
            checkDeliveryWay, setcheckDeliveryWay,
            deliveryTextarea, setDeliveryTextarea,
            selectedValue, setSelectedValue,
            errDeliveryINFO, setErrDeliveryINFO,
            contactNumber, setContactNumber,
            addItemInfo, setAddItemInfo,
            showAddItem, setShowAddItem,
            EditOrAdd, setEditOrAdd,
            EditIndex, setEditIndex,
            Orders, setOrders,
            ItemColor,
            dropDownShowAll, setdropDownShowAll,
            CartListFromWhereOpen, setCartListFromWhereOpen,
            colorsArray, setColorsArray,



            // function
            handelAddToCart,
            logIn,
            deleteItemFromArray



        }
    }




    const data = {

        useShareState,

    }




    return data;

}

export default reminders