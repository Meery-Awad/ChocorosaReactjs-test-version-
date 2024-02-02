import { useSelector } from "react-redux";

import './AddProducts.css'
import { useBetween } from "use-between";
import { useState } from "react";


const AddProducts = (props) => {
    const state = useSelector((state) => state.data);
  
    const { ProductInfo, setProductInfo,addOrEdit} = useBetween(state.useShareState);
    const state1 = useSelector((state) => state.data1);

    const { lang, arraylang } = useBetween(state1.useShareState);


    const handlePictureSelected = (event) => {
        var picture = event.target.files[0];
       
     

       
        setProductInfo((lastValue) => {
            return {
                ...lastValue,
                photo: picture,
                
              
            }
        });

    }
        const inputProductInfo = (event) => {

            const name = event.target.name;
            const value = event.target.value;
           
    
            setProductInfo((lastValue) => {
                return {
                    ...lastValue,
                    [name]: value
                }
            });
    
        }
    

    return (
        <>

            <div className="AddProducts" style={{ direction : lang== 'en' ? 'ltr' : 'rtl'} } >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
             

                <h1>{addOrEdit=='Edit'? arraylang[10].Edit_Item: arraylang[10].Add_New_item}</h1>

                <div className="container  " id="form">
                    <form className="mt-5" method="post" encType="multipart/form-data">

                        <div className="mb-3">
                            <label htmlFor="UrunImage" className="form-label"src={ProductInfo.ProductImag}>{arraylang[10].Item_Image}</label>
                            <input type="file" className="form-control" name="file" id="UrunImage" onChange={handlePictureSelected}  placeholder={ProductInfo.photo}   accept="image/*" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="UrunAdi" className="form-label">{arraylang[10].Item_Name}</label>
                            <input type="text" className="form-control" id="UrunAdi" name="ProductType" onChange={inputProductInfo} value={ ProductInfo.ProductType} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="UrunID" className="form-label">{arraylang[10].Description}</label>
                            <textarea className="form-control Description" name="text" onChange={inputProductInfo} value={ ProductInfo.text} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="UrunMiktar">{arraylang[10].Price}</label>
                            <input type="number" className="form-control" id="UrunMiktar" min={0} required  placeholder={arraylang[3].AED} name="price" onChange={inputProductInfo} value={ProductInfo.price}/>
                        </div>



                    </form>
                </div>

            </div>

        </>



    );
}

export default AddProducts;