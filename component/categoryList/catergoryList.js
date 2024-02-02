import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import '../HomePage/HomePage.css'
import './categoryList.css'
import { NavLink, useLocation } from "react-router-dom";
import AlertLogIn from '../logInPage/alertLogIn/alertLogIn'
import { Buffer } from 'buffer';




const CategoryList = () => {

    const state = useSelector((state) => state.data);

    const { category, categoryId, GiftType, colorOfCategory, logIn, categoryOption, arrayAllItem, continueWithLogIn, userlogIn } = useBetween(state.useShareState);

    const [sortOrder, setSortOrder] = useState('asc');
    const [filter, setFilter] = useState(false);

    var array, category1;
    if (categoryOption == 1) {
        array = category; category1 = GiftType
    }
    else {
        array = GiftType; category1 = category
    }
    const filteredProductsCont = arrayAllItem.filter((item) => {

        return categoryId == item.category || categoryId == item.occasions;
    });

    const [products, setProducts] = useState(filteredProductsCont)


    var catergoryListCont = products.length != 0 ? products.map((item, i) => {
        var img = null;
        if (item.photo) {
            if (item.photo.data) {

                const base64String = Buffer.from(item.photo.data).toString('base64');

                img = `data:image/*;base64,${base64String}`
            }
        }

        if (categoryId == item.category || categoryId == item.occasions) {

            return (

                <div key={item._id}>


                    <div className="categoryType">
                        <NavLink to='/Item' state={{ id: item._id, category: item, typeId: i }} style={{ textDecoration: "none" }}>
                            <img src={img}></img>
                            <div className="details">
                                <div className="name">{item.name1}</div>
                                <div className="price">{item.price} ADE</div>

                            </div>
                        </NavLink>
                        <div className="details">
                            <div className="addToCard" onClick={() => { logIn(item); showCheck(item._id) }}>Add to card <i class={`fa fa-check check${item._id}`} aria-hidden="true"></i></div>
                        </div>
                    </div>



                </div>


            )
        }
    }) : <p></p>





    const [lastColor, setLastColor] = useState("")

    const [minPrice, setMinPrice] = useState(12);
    const [maxPrice, setMaxPrice] = useState(1500);

    const handleMinPriceChange = (event) => {
        setMinPrice(parseInt(event.target.value));

    };
    // price rang
    const handleMaxPriceChange = (event) => {
        setMaxPrice(parseInt(event.target.value));

    };

    //

    // sort by price


    const sortByPrice = () => {

        const sortedProducts = [...products].sort((a, b) => {

            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

    };
    // 


    const resetFilters = () => {

        setProducts(filteredProductsCont)
        setMinPrice(12);
        setMaxPrice(1500);
        setSelectedOption("");
        setCheckedItems([])

    };
    const showCheck = (itemid) => {

        const showCheck = document.querySelector(`.check${itemid}`);
        if (continueWithLogIn == true || userlogIn == true) {

            showCheck.style.display = 'block'
        }
        setTimeout(function () {
            showCheck.style.display = 'none'
        }, 1500);

    }



    const [checkedItems, setCheckedItems] = useState([]);

    // Step 2: Write a function to handle checkbox change
    const handleCheckboxChange = (itemColor) => {

        setLastColor(itemColor)


        if (checkedItems.includes(itemColor)) {
            // If the item is already selected, remove it from the list
            setCheckedItems(prevChecked => prevChecked.filter(itemColor1 => itemColor1 !== itemColor));
        } else {
            // If the item is not selected, add it to the list
            setCheckedItems(prevChecked => [...prevChecked, itemColor]);

        }
    };

    const colorList = colorOfCategory.length ? colorOfCategory.map((item, i) => {

        return (
            <div key={i} className="filterCategory">

                <input
                    type="checkbox"
                    id={item._id}
                    checked={checkedItems.includes(item.color)}
                    onChange={() => handleCheckboxChange(item.color)}
                />
                <label htmlFor={item._id} className="colorLabel">{item.color}</label>

            </div>
        )
    }) : <p></p>


    const [selectedOption, setSelectedOption] = useState("");

    const handleRatioChange = (value) => {
        setSelectedOption(value);
    };

    const CategoryList = category1.length ? category1.map((item, i) => {
        return (
            <div key={i} className="filterCategory">

                <input
                    type="radio"
                    name="option"
                    value={item.type}
                    checked={selectedOption === item.type}
                    onChange={() => handleRatioChange(item.type)}
                />
                <label htmlFor={item._id} className="colorLabel">{item.type}</label>

            </div>
        )
    }) : <p></p>


    const [lazy, setlazy] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0);



    }, [])
    useEffect(() => {

        setProducts(filteredProductsCont)
        setMinPrice(12);
        setMaxPrice(1500);
        setSelectedOption("");
        setCheckedItems([]);


    }, [categoryId])



    useEffect(() => {
        if (minPrice != 12 || maxPrice != 1500 || selectedOption != "" || checkedItems != []) {

            const filteredProducts = filteredProductsCont.filter((product) => {
                const price = product.price;
                var colorbool = true;

                for (var i = 0; i < checkedItems.length; i++) {
                    colorbool = product.colorArray.colorName.includes(checkedItems[i]);

                    if (colorbool == false) break
                }

                return price >= minPrice && price <= maxPrice && colorbool == true && (selectedOption == product.category || selectedOption == "");
            });

            setProducts(filteredProducts);

        }


    }, [checkedItems, minPrice, maxPrice, selectedOption])



    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />



            <div className="categoryListCont">
                <div className="subHeader">

                    <div className="title1"> {categoryId}</div>

                    <div className="filterAndSort">
                        <div className="filter">

                            <i class="fa fa-filter" aria-hidden="true" onClick={() => setFilter(!filter)}></i>
                            {filter == true &&

                                <div className="rangPriceFilter">
                                    <i class="fa fa-close" onClick={() => setFilter(!filter)}></i>
                                    <div onClick={resetFilters} className="resetFilter">Reset Filters</div>
                                    <div>
                                        <div className="titleFilter">  Price Range: </div>

                                        <label>
                                            Min :  {minPrice}
                                            <br />
                                            <input type="range" min={12} max={1500} value={minPrice} onChange={handleMinPriceChange} />

                                        </label>
                                        <br />
                                        <label>
                                            Max : {maxPrice}
                                            <br />
                                            <input type="range" min={12} max={1500} value={maxPrice} onChange={handleMaxPriceChange} />

                                        </label>
                                    </div>
                                    <div>
                                        <div className="titleFilter">  Colors: </div>
                                        <ul>
                                            {
                                                colorList
                                            }
                                        </ul>

                                    </div>
                                    <div>
                                        <div className="titleFilter">  Category: </div>
                                        <ul>
                                            {
                                                CategoryList
                                            }
                                        </ul>

                                    </div>
                                </div>



                            }
                        </div>
                        <i className='fas fa-exchange-alt' title="Sort by price" onClick={sortByPrice}></i>
                    </div>


                </div>

                <div className="oneCategoryList">

                    {catergoryListCont}

                </div>
                <AlertLogIn />
            </div>
        </>



    );
}

export default CategoryList;