import React, {  useEffect, useState } from 'react';
import './Carousel.css';
import Slider1 from "../../assets/images/slider1.avif"; 
import Slider2 from "../../assets/images/slider2.avif"; 
import Slider3 from "../../assets/images/slider3.avif"; 
import Slider4 from "../../assets/images/slider4.avif"; 
import Slider5 from "../../assets/images/slider5.webp"; 
import Slider6 from "../../assets/images/slider6.avif"; 
import http from '../../services/httpService';
import Loading from '../../components/Loading';
import { useHistory  } from 'react-router-dom';

const PackageList = () => {
  const history = useHistory ();
  const [isMonthly, setisMonthly] = useState(true);
  const [filteredPackages, setFilteredPackages] = useState([])
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [autoSlideTimeout, setAutoSlideTimeout] = useState(null);
  const [transitionTimeout, setTransitionTimeout] = useState(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  const images = [Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];

  const getImageByIndex = (index) => {
    return images[index % images.length];
  };
  const handleSubscribeClick = (item) => {
    history.push('/user/signup', { selectedPackage: item })
  };

  // useEffect(() => {
  //   if (!loading && filteredPackages.length > 0) {
  //     startAutoSlide();  // Start auto-slide only when the data is ready
  //   }
  //   return () => {
  //     clearTimeout(autoSlideTimeout);
  //     clearTimeout(transitionTimeout);
  //   };
  // }, [loading, filteredPackages]);  // Now it depends on `loading` and `allPackages`
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 3000); // 1 seconds
  //   return () => clearInterval(interval);
  // }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === filteredPackages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredPackages.length - 1 : prev - 1));
  };

  // const startAutoSlide = () => {
  //   clearTimeout(autoSlideTimeout);
  //   const timeout = setTimeout(() => {
  //     showSlider('next');
  //   }, timeAutoNext);
  //   setAutoSlideTimeout(timeout);
  // };
  const showSlider = (type) => {
    const carouselElement = document.querySelector('.carousel');
  
    if (carouselElement) {
      let newSliderItems = [...filteredPackages];
      
      if (type === 'next') {
        newSliderItems.push(newSliderItems.shift());
      } else {
        newSliderItems.unshift(newSliderItems.pop());
      }
  
      setFilteredPackages(newSliderItems);
  
      carouselElement.classList.add(type);
  
      clearTimeout(transitionTimeout);
      const timeout = setTimeout(() => {
        carouselElement.classList.remove(type);
      }, timeRunning);
      setTransitionTimeout(timeout);
  
      // startAutoSlide();
    } else {
      console.error('Carousel element not found.');
    }
  };
  
  // const showSlider = (type) => {
  //   let newSliderItems = [...filteredPackages];
  //   // let newThumbnails = [...allPackages];
    
  //   if (type === 'next') {
  //     newSliderItems.push(newSliderItems.shift());
  //     // newThumbnails.push(newThumbnails.shift());
  //   } else {
  //     newSliderItems.unshift(newSliderItems.pop());
  //     // newThumbnails.unshift(newThumbnails.pop());
  //   }

  //   setFilteredPackages(newSliderItems);
  //   // setAllPackages(newThumbnails);
    
  //   document.querySelector('.carousel').classList.add(type);

  //   clearTimeout(transitionTimeout);
  //   const timeout = setTimeout(() => {
  //     document.querySelector('.carousel').classList.remove(type);
  //   }, timeRunning);
  //   setTransitionTimeout(timeout);

  //   startAutoSlide();
  // };
  const getAllPackages = async () => {
    try {
      
      const result = await http.get('/api/services/app/Package/GetPackageList');
      console.log("api call hoi or ye res aya",result)
      setLoading(true);
        const modified = result?.data?.result?.items?.map((item, index) => ({
          ...item,
          img: getImageByIndex(index), // Use API image or fallback
        }));
        setAllPackages(modified);
        setFilteredPackages(modified.filter((i)=>i.isMonthly===true))
        setLoading(false);
    } catch (error) {
      console.error("Failed to make get all Packages API call", error);
      setLoading(false);
    }
  };

  const filterData=()=>allPackages.filter((i)=>i.isMonthly===isMonthly)
  useEffect(() => {
    getAllPackages();
    // eslint-disable-next-line
  }, []);
  if(loading){
    return(
      <div className="d-flex justify-content-center align-items-center carousel">
      <Loading />
    </div>
    )
  }else
  return (
    <>
    
    <div className="carousel">
    <div className="tabs">
        <button 
          className={`tab ${isMonthly === true ? 'active' : ''}`} 
          onClick={() =>{
            setisMonthly(true)
            setFilteredPackages(allPackages.filter((i)=>i.isMonthly===true))
          }}
        >
          Monthly
        </button>
        <button 
          className={`tab ${isMonthly === false ? 'active' : ''}`} 
          onClick={() => {setisMonthly(false)
            setFilteredPackages(allPackages.filter((i)=>i.isMonthly===false))
          }}
        >
          Yearly
        </button>
      </div>
      <div className="list">
        {filteredPackages.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.img} alt={item.packageName} />
            <div className="content">
              <div className="author">{item.packageName} - {item.isMonthly?'Monthly':'Yearly'}</div>
              <div className="topic">{item.caseRegister}</div>
              <div className="topic">{item.lawyerRegister}</div>
              <div className="topic">{item.adminPanel}</div>
              <div className="topic">{item.details}</div>
              <div className="topic">{item.branchRegistration}</div>
              <div className="topic">{item.rolesManage}</div>
              <div className="topic">{item.usersRegistration}</div>
              <div className="price">{item.exactPrice}</div>
              <div className="buttons">
              <button onClick={() => handleSubscribeClick(item)}>
                SUBSCRIBE
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {filteredPackages.map((thumb, index) => (
          <div className="item" key={index} >
            <img src={thumb.img} alt="thumbnail" />
            <div className="content">
              <div className="title">{thumb.packageName}</div>
              <div className="description">{thumb.caseRegister}</div>
              <div className="description">{thumb.lawyerRegister}</div>
              <div className="price">{thumb.exactPrice}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={() => showSlider('prev')}>&lt;</button>
        <button id="next" onClick={() => showSlider('next')}>&gt;</button>
      </div>

      <div className="time"></div>
    </div>
    </>
  );
};

export default PackageList;
