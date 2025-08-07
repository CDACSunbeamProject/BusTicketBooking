import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addNewBus } from '../services/BusService';
import dayjs from "dayjs";
import { useAuth } from '../../AuthContext';
//import { addProperty } from '../services/property'

function AddBuses1() {
    const [departureTime, setDepartureTime] = useState("");
    const formattedDepartureTime = departureTime + ":00";
    const [arrivalTime, setArrivalTime] = useState(""); // e.g. "22:03"
    const formattedArrivalTime = arrivalTime + ":00";   // becomes "22:03:00"

    const [departureDate, setDepartureDate] = useState(""); // e.g., "2025-08-10"
    const formattedDepartureDate = dayjs(departureDate).format("DD-MM-YYYY");


    const [info, setInfo] = useState({
        busName: '',
        busNo: '',
        busType: '',
        operatorName: '',
        startLocation: '',
        endLocation: '',
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        fare: '',
        totalSeats: '',
        isAC: false,
        busCategory: '',
        amenities: [],
    });
    const { token } = useAuth();

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();

        const formattedDepartureDate = dayjs(info.departureDate).format("DD-MM-YYYY");
        const formattedArrivalDate = dayjs(info.arrivalDate).format("DD-MM-YYYY");

        const formattedDepartureTime = info.departureTime + ":00";
        const formattedArrivalTime = info.arrivalTime + ":00";

        const newBus = {
            busName: info.busName,
            busNo: info.busNo,
            busType: info.busType,
            operatorName: info.operatorName,
            startLocation: info.startLocation,
            endLocation: info.endLocation,
            departure_date: formattedDepartureDate,
            departure_time: formattedDepartureTime,
            arrival_date: formattedArrivalDate,
            arrival_time: formattedArrivalTime,
            fare: Number(info.fare),
            noOfSeats: Number(info.totalSeats),
            isAC: info.isAC,
            busCategory: info.busCategory,
            amenities: info.amenities,
        };
        console.log("Token being sent:", token);
        console.log(newBus)
        addNewBus(newBus, token)
            .then((response) => {
                toast.success('Bus added successfully!');
                navigate('/buses');
            })
            .catch((error) => {
                console.error('Error adding bus:', error);
                toast.error('Failed to add bus.');
            });
    };

    return (
        <div className='container'>
            <h2 className='page-header'>Add Bus</h2>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Name</label>
                    <input
                        value={info.busName}
                        onChange={(e) => setInfo({ ...info, busName: e.target.value })}
                        type='text'
                        placeholder='Enter bus name'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Type</label>
                    <input
                        value={info.busType}
                        onChange={(e) => setInfo({ ...info, busType: e.target.value })}
                        type='text'
                        placeholder='Enter bus type(Volvo,Benz...)'
                        className='form-control'
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>operatorName:</label>
                    <input
                        value={info.operatorName}
                        onChange={(e) => setInfo({ ...info, operatorName: e.target.value })}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>totalSeats:</label>
                    <input
                        value={info.totalSeats}
                        onChange={(e) => setInfo({ ...info, totalSeats: e.target.value })}
                        type='text'
                        className='form-control'
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Start Location:</label>
                    <input
                        value={info.startLocation}
                        onChange={(e) => setInfo({ ...info, startLocation: e.target.value })}
                        required
                        className='form-control'
                    />

                </div>
                <div className='col'>
                    <label htmlFor=''>End Location:</label>
                    <input
                        value={info.endLocation}
                        onChange={(e) => setInfo({ ...info, endLocation: e.target.value })}
                        required
                        className='form-control'
                    />

                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Departure Date and Time</label>
                    <input
                        value={info.departureDate}
                        onChange={(e) => setInfo({ ...info, departureDate: e.target.value })}
                        type='date'
                        className='form-control'
                    />
                    <input
                        value={info.departureTime?.slice(0, 5)}
                        onChange={(e) => setInfo({ ...info, departureTime: e.target.value })}
                        type='time'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Arrival Date and Time</label>
                    <input
                        value={info.arrivalDate}
                        onChange={(e) => setInfo({ ...info, arrivalDate: e.target.value })}
                        type='date'
                        className='form-control'
                    />
                    <input
                        value={info.arrivalTime?.slice(0, 5)}
                        onChange={(e) => setInfo({ ...info, arrivalTime: e.target.value })}
                        type='time'
                        className='form-control'
                    />
                </div>
            </div>

            {/*<div className='row mb-3'>
        <div className='col'>
          <label htmlFor=''>Bus Details</label>
          <textarea
            onChange={(e) => setInfo({ ...info, details: e.target.value })}
            rows={5}
            className='form-control'
          />
        </div>
      </div>*/}

            {/*<div className='row mb-3'>
                <label htmlFor=''>Route:</label>
                <select
                    //value={selectedRouteId}
                    //onChange={(e) => setSelectedRouteId(e.target.value)}
                    required
                >
                    <option value="">-- Select Route --</option>
                    <option value="">Kolhapur to Pune</option>
                    <option value="">Pune to Mumbai</option>
                    {/*routes.map((route) => (
                    <option key={route.id} value={route.id}>
                        {route.source} → {route.destination}
                    </option>
                ))}
                </select>
                
            </div>*/}



            {/*<div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>#Guests</label>
                    <input
                        onChange={(e) => setInfo({ ...info, guests: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>#Bedrooms</label>
                    <input
                        onChange={(e) => setInfo({ ...info, bedrooms: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>#Beds</label>
                    <input
                        onChange={(e) => setInfo({ ...info, beds: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
            </div>*/}

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Fare</label>
                    <input
                        value={info.fare}
                        onChange={(e) => setInfo({ ...info, fare: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>

                <div className='col'>
                    <label htmlFor=''>Photo</label>
                    <input
                        onChange={(e) => setPhoto(e.target.files[0])}
                        type='file'
                        className='form-control'
                    />
                </div>
            </div>

            <div className='mb-3 row'>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isLakeView: e.target.checked ? 1 : 0 })
                        }
                        type='radio'
                        name='seatType'
                    />{' '}
                    <span>Seater</span>
                </div>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isTV: e.target.checked ? 1 : 0 })
                        }
                        type='radio'
                        name='seatType'
                    />{' '}
                    <span>Sleeper</span>
                </div>

            </div>

            <div className='mb-3 row'>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isLakeView: e.target.checked ? 1 : 0 })
                        }
                        type='radio'
                        name='isAC'
                    />{' '}
                    <span>AC</span>
                </div>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isTV: e.target.checked ? 1 : 0 })
                        }
                        type='radio'
                        name='isAC'
                    />{' '}
                    <span>non-AC</span>
                </div>

            </div>

            <div className='mb-3 row'>
                <label>Amenities:</label>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isLakeView: e.target.checked ? 1 : 0 })
                        }
                        type='checkbox'
                    />{' '}
                    <span>Wifi</span>
                </div>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isTV: e.target.checked ? 1 : 0 })
                        }
                        type='checkbox'
                    />{' '}
                    <span>Charging</span>
                </div>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isAC: e.target.checked ? 1 : 0 })
                        }
                        type='checkbox'
                    />{' '}
                    <span>Water Bottle</span>
                </div>
                <div>
                    <input
                        onChange={(e) =>
                            setInfo({ ...info, isWifi: e.target.checked ? 1 : 0 })
                        }
                        type='checkbox'
                    />{' '}
                    <span>Reading Light</span>
                </div>

            </div>

            <div className='row'>
                <div className='col'>
                    <button
                        onClick={handleSave}
                        className='btn btn-success'
                    >
                        Save
                    </button>
                    <button
                        //onClick={onCancel}
                        className='btn btn-danger ms-2'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    )

}

export default AddBuses1
/**
 *

 */