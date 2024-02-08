import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import useFetch from "../../hooks/useFetch"
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import("./reserve.css")

const Reserve = ({ setOpen, hotelId }) => {
    const navigate=useNavigate()
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotel/room/${hotelId}`)
    const { date } = useContext(SearchContext)
    console.log(data)
    const [selectedRooms, setSelectedRooms] = useState([])
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((e) => {
            return (e !== value)
        }))
    }
    const getDateRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const datest = new Date(start.getTime())
        let list = []
        while (datest <= end) {
            list.push(new Date(datest))
            datest.setDate(datest.getDate() + 1)
        }
        return (list)
    }
    const allDates = getDateRange(date[0].startDate, date[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => {
            return (allDates.includes(new Date(date).getTime()))
        })

        return (!isFound)
    }
    console.log(selectedRooms)
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`http://localhost:5000/api/room/availablity/${roomId}`, { date: allDates })
                return (res.data)
            }))
            setOpen(false)
            navigate("/")
        } catch (err) {
            
        }
    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className="rclose"

                    onClick={() => { setOpen(false) }} />
                <span>Select your rooms:</span>
                {data?.map(item => {
                    return (<div className="rItem">
                        <div className="rinfo">
                            <div className="rtitle">{item.title}</div>
                            <div className="rdesc">{item.desc}</div>
                            <div className="rmaxpep">Max People:<b>{item.maxPeople}</b></div>
                            <d className="rPrice">{item.price}</d>
                        </div>
                        {item.roomNumbers.map((roomNumber) => {
                            return (<div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect}
                                    disabled={!isAvailable(roomNumber)}
                                />

                            </div>)
                        })}
                    </div>)

                })}
                <button className="rButton" onClick={handleClick}>Reserve now!!</button>
            </div>
        </div>
    )
}

export default Reserve