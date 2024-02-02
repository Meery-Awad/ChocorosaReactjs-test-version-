import { useSelector } from "react-redux";
import { Buffer } from 'buffer';
import './ourNew.css'
import { useBetween } from "use-between";
import { NavLink, useNavigate } from "react-router-dom";


const OurNew = () => {

  // <get the data from rducers>
  const state = useSelector((state) => state.data);

  const { arrayAllItem, setEditIndex } = useBetween(state.useShareState);
  var arrayAllItemList

  const navigate = useNavigate();
  const navigateToCategory = (id, item, i) => {

    setEditIndex(i)
    navigate('/Item', { state: { id: id, category: item, typeId: i } }, { replace: false });
  }
  arrayAllItemList = arrayAllItem.length <= 15 ? arrayAllItem.map((item, i) => {
    // URL.createObjectURL(item.photo)'
    var img = "";
    if (item.photo) {
    if (item.photo.data) {

      const base64String = Buffer.from(item.photo.data).toString('base64');

      img = `data:image/*;base64,${base64String}`
    }
  }
    return (

      <img class='item' src={img} onClick={() => navigateToCategory(item._id, item, i)}></img>

    )
  }) :
    arrayAllItem.slice(0, 15).map((item, i) => {
      var img = "";
      if (item.photo) {
        if (item.photo.data) {

          const base64String = Buffer.from(item.photo.data).toString('base64');

          img = `data:image/*;base64,${base64String}`
        }
      }
      return (

        <img class='item' src={img} onClick={() => navigateToCategory(item._id, item, i)}></img>


      )
    })



  const animate = (a, b, items) => {

    a.style.transform += `translateX(${-items[0].offsetWidth}px)`;
    b.style.transform += `translateX(${items[0].offsetWidth}px)`;
  }

  const previous = (items) => {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    track.prepend(items[items.length - 1]);
    animate(slider, track, items);
  }

  const next = (items) => {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    track.append(items[0]);
    animate(track, slider, items);
  }

  const activate = (e) => {
    const slider = document.querySelector('.slider');
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.item');
    e.target.closest('.next') && next(items);
    e.target.closest('.prev') && previous(items);
  }
  // const sliderTimer = () => {

  //   const items = document.querySelectorAll('.item');

  //   next(items);

  // }
  // setInterval(sliderTimer, 3500);

  return (
    < div className="ourNew">
      <main>
        <br></br>
        <div className="title1" style={{ marginTop: '30px' }}>Our New</div>

        <div class='container'>

          <div class='slider '>
            <ul class='slider-track'>

              {arrayAllItemList}

            </ul>
          </div>
          <button class='btnOurNew next' onClick={activate}><i class='fas fa-angle-left' name="chevron-back-outline"></i></button>
          <button class='btnOurNew prev' onClick={activate}><i class='fas fa-angle-right' name="chevron-back-outline"></i></button>

        </div>
      </main>
    </div >



  );
}

export default OurNew;