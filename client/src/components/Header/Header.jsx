import { useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Header = (props) => {
    const{user}=useContext(AuthContext)
    const navigate=useNavigate();
    const [destination,setDestination]=useState("")
    const [openDate,setOpenDate]=useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions,setOpenOptions]=useState(false)
    const [options,setOptions]=useState({
        adult:1,
        children:0,
        room:1
    })
    const handleOption=(name,operation)=>{
        setOptions((prev)=>{
            return{...prev,[name]:operation==='i'?options[name]+1:options[name]-1}
        })
    }
    const{dispatch}=useContext(SearchContext)
    const handleSearch=(e)=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
        navigate("/hotels",{state:{destination,date,options}})
        // console.log(destination)
        // console.log(date)
        // console.log(options)

    }

    return (
        <div className='header'>
            <div className="headerContainer" style= {props.type==='list'?{ margin: "20px 0px 0px 0px"}:{margin: "20px 0px 100px 0px"}}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxis</span>
                    </div>
                </div>
               { props.type!=='list'&& <><h1 className="headerTitle">Wanna get a lifetime of discount..? It's possible!!</h1>
                <p className="headerDesc">Get rewarded for your travels. Get an instant discount of 15% with a BookYourStay account</p>
                {!user&&<button className='headerBtn'>Sign in/ Register</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" name="" id="" placeholder='Where are you going?' className='headerSearchInput' onChange={(e)=>{setDestination(e.target.value)}} />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={()=>{setOpenDate(!openDate)}} className='headerSearchText'>{`${format( date[0].startDate,"dd/MM/yyyy")} to ${format( date[0].endDate,"dd/MM/yyyy")}`}</span>
                       { openDate&&<DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            minDate={new Date()}
                        className='date'/>}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={()=>{setOpenOptions(!openOptions)}} className="headerSearchText">{`${options.adult} Adult ${options.children} Child ${options.room} Room`}</span>
                        {openOptions&&<div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                <button className="optionCounterButton" onClick={()=>{handleOption("adult","d")}}disabled={options.adult<=1}>-</button>
                                <span className="optionCounterNumber">{`${options.adult}`}</span>
                                <button className='optionCounterButton'onClick={()=>{handleOption("adult","i")}}>+</button></div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                <button className="optionCounterButton" onClick={()=>{handleOption("children","d")}}disabled={options.children<1}>-</button>
                                <span className="optionCounterNumber">{`${options.children}`}</span>
                                <button className='optionCounterButton' onClick={()=>{handleOption("children","i")}}>+</button></div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Rooms</span>
                                <div className="optionCounter">
                                <button className="optionCounterButton"onClick={()=>{handleOption("room","d")}}
                                disabled={options.room<=1}>-</button>
                                <span className="optionCounterNumber">{`${options.room}`}</span>
                                <button className='optionCounterButton'onClick={()=>{handleOption("room","i")}}>+</button ></div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div></>}
            </div>
        </div>
    )
}

export default Header