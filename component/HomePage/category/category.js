import { useSelector } from "react-redux";

import './category.css'
import { useBetween } from "use-between";
import { useNavigate } from "react-router-dom";


const Category = () => {

    const state = useSelector((state) => state.data);

    const { category, setCategoryId, setCategoryOption ,arrayAllItem} = useBetween(state.useShareState);

    const navigate = useNavigate();
    const navigateToCategory = (i) => {
        setCategoryId(i)
        setCategoryOption(1)
        navigate('/CategoryList', { replace: false });
    }

    const categoryCont = category.length ? category.map((item, i) => {

        return (
            <div className="gategory-item item1" style={{ backgroundColor: item.color }} key={item._id} onClick={() => navigateToCategory(item.type)}>
                <div className="circle1">
                    <span>○</span>
                    <span>∘</span>
                    <span>◌</span>
                </div>
                <div className="circle2">
                    <span>❀</span>
                    <span>∘</span>
                    <span>○</span>
                </div>

                {item.type}


            </div>
        )
    }) : <p></p>

    return (
        < div className="Category">


            {categoryCont}


        </div >



    );
}

export default Category;