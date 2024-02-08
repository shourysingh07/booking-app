import useFetch from '../../hooks/useFetch';
import './fproperties.css'

// const Fproperties = () => {
//   return (
//     <div className="fp">
//     <div className="fpItem">
//       <img
//         src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y290dGFnZXxlbnwwfHwwfHw%3D&w=1000&q=80"
//         alt=""
//         className="fpImg"
//       />
//       <span className="fpName">Valley Cottage</span>
//       <span className="fpCity">Leh</span>
//       <span className="fpPrice">Starting from ₹5,000</span>
//       <div className="fpRating">
//         <button>8.9</button>
//         <span>Excellent</span>
//       </div>
//     </div>
//     <div className="fpItem">
//       <img
//         src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
//         alt=""
//         className="fpImg"
//       />
//       <span className="fpName">Comfort Suites Airport</span>
//       <span className="fpCity">Austin</span>
//       <span className="fpPrice">Starting from $140</span>
//       <div className="fpRating">
//         <button>9.3</button>
//         <span>Exceptional</span>
//       </div>
//     </div>
//     <div className="fpItem">
//       <img
//         src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
//         alt=""
//         className="fpImg"
//       />
//       <span className="fpName">Four Seasons Hotel</span>
//       <span className="fpCity">Lisbon</span>
//       <span className="fpPrice">Starting from $99</span>
//       <div className="fpRating">
//         <button>8.8</button>
//         <span>Excellent</span>
//       </div>
//     </div>
//     <div className="fpItem">
//       <img
//         src="https://lh3.googleusercontent.com/e_Cq7xI8WS3ojvOLBEjSEgg7xVoSDpPiqdT517sxVt4mNk0jkEOOhcQgXh7ZGnrFWRiFgmOn3J2LVuOe-qKiAFdqwmFFWaNrI1SP-eLb=w900-rw"
//         alt=""
//         className="fpImg"
//       />
//       <span className="fpName">Kylin Express</span>
//       <span className="fpCity">New Delhi</span>
//       <span className="fpPrice">Starting from ₹900</span>
//       <div className="fpRating">
//         <button>8.9</button>
//         <span>Excellent</span>
//       </div>
//     </div>
//   </div>
//   )
// }
const Fproperties = () => {
  const { data, loading, error } = useFetch("/hotel?featured=true&limit=4");
    // console.log(data)
    // console.log(data.hotelData)
    const list=data.hotelData
    // console.log(list)
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {list?.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Fproperties