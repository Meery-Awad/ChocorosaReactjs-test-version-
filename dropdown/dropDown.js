import { useEffect, useState } from "react";

import './dropDown.css'
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import { useNavigate } from "react-router-dom";



const DropDown = (props) => {
    const state = useSelector((state) => state.data);

    const { selectOption, setSelectOption, setCategoryOption, setCategoryId, dropDownShowAll , setdropDownShowAll} = useBetween(state.useShareState);


    const dropDown = props.data.dropDown
    const id = props.data.id;


    const [dropDownShow, setdropDownShow] = useState(false);

    const navigate = useNavigate();
    const navigateToCategory = (i) => {

        setCategoryId(i)
        if (id == "Categories")
            setCategoryOption(1)
        else
            setCategoryOption(2)
        navigate('/CategoryList', { replace: false });
    }

    const dropDownList = dropDown.map((item, i) => {

        return (
            <div key={item._id} onClick={() => { navigateToCategory(item.type); setdropDownShow(false) }} className="dropDownItem">
                {item.type}
            </div>
        )
    }
    )

    useEffect(() => {
        setdropDownShow(false)
        setSelectOption(dropDown[0].type)
       
            setdropDownShowAll(false)
      

    }, [])

    return (
        <>
            <div className="dropDownCont" >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />

                <div className="dropDown" >

                    <div className="btnDropDown" onClick={() => setdropDownShow(!dropDownShow)}> <span>{id} </span><i className='fas fa-angle-down'></i> </div> 

                    {dropDownShowAll == false && <div className="dropDownList" style={{ display: dropDownShow ? 'block' : 'none' }}>
                        {dropDownList}
                    </div>

                    }
                </div>
            </div>

        </>



    );
}

export default DropDown;