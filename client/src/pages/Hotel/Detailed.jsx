import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch'
import Header from '../../components/Header/Header'
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar'
import './detailed.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Detailed = () => {
  const location=useLocation()
  const{user}=useContext(AuthContext)
  const navigate=useNavigate();
  // console.log(location.pathname.split('/')[2])
  const id=location.pathname.split('/')[3]
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleBook=(e)=>{
    if(user)
    {
      setOpenModal(true)
    }
    else
    {
      navigate("/login")
    }
  }
  const{data,loading,error,reFetch}= useFetch(`/hotel/find/${id}`)
  const {date,destination}=useContext(SearchContext)
  console.log(date)
  // console.log(destination);
  const hotData=data?.hotelData
  console.log(data?.hotelData) 
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(date[0]?.endDate, date[0]?.startDate);
  // console.log(days)
  const photos = [
    {
      src: "https://img.staticmb.com/mbphoto/property/cropped_images/2022/Dec/14/Photo_h0_w320/64636845_4_tudioapartment_0_320.jpg",
    },
    {
      src: "https://img.staticmb.com/mbphoto/property/cropped_images/2022/Dec/14/Photo_h0_w320/64636845_2_gardenrestaurantdesignideas_0_320.jpg",
    },
    {
      src: "https://img.staticmb.com/mbimages/project/Photo_h0_w320/2022/08/03/Project-Photo-2-Bhutani-Cyber-Park-Noida-5334027_600_800_0_320.jpg",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    // {
    //   src: "https://img.staticmb.com/mbimages/project/Photo_h0_w320/2022/08/03/Project-Photo-1-Bhutani-Cyber-Park-Noida-5334027_345_1366_0_320.jpg",
    // },
    {
      src: "https://img.staticmb.com/mbphoto/property/cropped_images/2022/Dec/14/Photo_h0_w320/64636845_5_lakeloftslosangelescabuildingphoto_0_320.jpg",
    },
  ];
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 4 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 4 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading?"Loading Please Wait":<div className="hotelContainer">
      {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
      <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBook}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotData?.hotelname}</h1>
          {/* <h1 className="hotelTitle">Eldeco Studio</h1> */}
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotData?.address} {hotData?.city}</span>
            {/* <span>Canught Palace ,New Delhi</span> */}
          </div>
          <span className="hotelDistance">
            Excellent location – {hotData?.distance}m from Canaught Palace
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹ 4,000 at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotData?.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                  {/* Located a 5-minute walk from Canaught Palace, Eldeco Studio has accommodations with air conditioning and
                  free WiFi. The units come with hardwood floors and feature a
                  fully equipped kitchenette with a microwave, a flat-screen TV,
                  and a private bathroom with shower and a hairdryer. A fridge is
                  also offered, as well as an electric tea pot and a coffee
                  machine. Popular points of interest near the apartment include
                  Canaught Palace, Chandani Choak and Patel Choak. The nearest
                  airport is Indira Gandhi International Airport –New Delhi, 36 km
                  from Eldeco Studio, and the property offers a paid
                  airport shuttle service. */}
                  {hotData?.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              {/* <h1>Perfect for a {days}-night stay!</h1> */}
              <span>
                Located in the real heart of Delhi, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                {/* <b>₹ {hotData?.cheapestPrice*days}</b> ({days} nights) */}
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
        </div>}
        {openModal&&<Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Detailed