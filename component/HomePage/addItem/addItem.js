import './addItem.css'
import '../../logInPage/login.css'
import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import { useSelector } from 'react-redux';

const AddItem = () => {

    const state = useSelector((state) => state.data);
    const { ItemColor, GiftType, category, addItemInfo, setAddItemInfo, EditIndex, arrayAllItem ,EditOrAdd
        , colorsArray, setColorsArray } = useBetween(state.useShareState);

    const [selectedValue, setSelectedValue] = useState("");

    const handleAddItemInfo = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setAddItemInfo((lastValue) => {
            return {
                ...lastValue,
                [name]: value,


            }
        });
    }
    const handlePictureSelected = (event) => {
        var picture = event.target.files[0];

        setAddItemInfo((lastValue) => {
            return {
                ...lastValue,
                photo: picture,


            }
        });

    }


    const handleDropdownChange = (e) => {

        setSelectedValue(e.target.value);
        var color = {
            _id: colorsArray.length + 1,
            colorName: e.target.value
        }

        const isColorIncludes = colorsArray.filter(item => item.colorName.includes(color.colorName));
    
        if (isColorIncludes.length==0){
           
            setColorsArray([...colorsArray, color]);
        }

    }
    const handleDeleteColor = (item) => {

        setColorsArray(colorsArray.filter(item1 => item1 !== item));



    }



    const selectedColorList = colorsArray.length != 0 ? colorsArray.map((item, i) => {
        return (
            <div key={i} className='selectedColor'>

                <div>{item.colorName} </div>  <i className="fa fa-times" aria-hidden="true" onClick={() => handleDeleteColor(item)}></i>
            </div>
        )
    }) : <p></p>

    const colorList = ItemColor.map((item, i) => {
        return (
            <option value={item.colorName} key={i}>{item.colorName}</option>
        )
    })
    const OccasionList = GiftType.map((item, i) => {
        return (
            <option value={item.type} key={i}>{item.type}</option>
        )
    })
    const categoryList = category.map((item, i) => {
        return (
            <option value={item.type} key={i}>{item.type}</option>
        )
    })

    useEffect(() => {

        setAddItemInfo((lastValue) => {
            return {
                ...lastValue,

                photo: null,
                price: "",
                name: "",
                name1: "",
                description: "",
                description1: "",
                category: category[0].type,
                occasions: GiftType[0].type,
                colorArray: [],
            }
        });
        setColorsArray([])
        if (EditOrAdd!='Add') {

            setAddItemInfo((lastValue) => {

                return {
                    ...lastValue,

                    photo: arrayAllItem[EditIndex].photo,
                    price: arrayAllItem[EditIndex].price,
                    name: arrayAllItem[EditIndex].name,
                    name1: arrayAllItem[EditIndex].name1,
                    description: arrayAllItem[EditIndex].description,
                    description1: arrayAllItem[EditIndex].description1,
                    category: arrayAllItem[EditIndex].category,
                    occasions: arrayAllItem[EditIndex].occasions,
                    colorArray: colorsArray.length==0 ? arrayAllItem[EditIndex].colorArray : colorsArray,
                    _id: arrayAllItem[EditIndex]._id,
                }
            });
            colorsArray.length==0 ?  setColorsArray(arrayAllItem[EditIndex].colorArray) : setColorsArray(colorsArray)

        }
    }, [arrayAllItem.length])

    return (

        <div className='AddItem'>
            <div className='AddItemTitle'>Add New <span>Item </span></div>
            <form>
                <div className="mb-3">
                    <label htmlFor="UrunImage" className="form-label" src={addItemInfo.image}>Image</label>
                    <input type="file" className="form-control" name="file" id="UrunImage"

                        onChange={handlePictureSelected} placeholder="Item Image" accept="image/*" />
                </div>

                <label for="fullname">Item Name <span>(English)</span></label>
                <input type="text" id="itemName"
                    placeholder="Enter the item name" name='name'
                    value={addItemInfo.name}
                    onChange={handleAddItemInfo} />

                <label for="fullname">Item Name <span>(Arabic)</span></label>
                <input type="text" id="name1"
                    placeholder="Enter the item name"
                    name='name1'
                    value={addItemInfo.name1}
                    onChange={handleAddItemInfo} />

                <label for="Price">Price</label>
                <input type="number" id="name1"
                    placeholder="Enter the item price"
                    name='price'
                    value={addItemInfo.price}
                    onChange={handleAddItemInfo} />

                <label for="description">Description <span>(English)</span></label>
                <textarea type="text" id="description"
                    placeholder="Enter item description" name='description'
                    value={addItemInfo.description} onChange={handleAddItemInfo} />


                <label for="description">Description <span>(Arabic)</span></label>
                <textarea type="text" id="description" placeholder="Enter item description"
                    name='description1' value={addItemInfo.description1} onChange={handleAddItemInfo} />

                <label for="color">Color </label>
                <select value={selectedValue} name='colorArray' onChange={handleDropdownChange} className="selectEmirate">
                    {colorList}
                </select>
                <div className='selectedColorList'>
                    {selectedColorList}
                </div>


                <label for="Occasion">Occasion</label>
                <select value={addItemInfo.occasions} name='occasions' onChange={handleAddItemInfo} className="selectEmirate">
                    {OccasionList}

                </select>
                <label for="Category">Category</label>
                <select value={addItemInfo.category} name='category' onChange={handleAddItemInfo} className="selectEmirate">
                    {categoryList}

                </select>

            </form>



        </div >



    );
}

export default AddItem;