import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
//import { addProperty } from '../services/property'

function AddBuses1() {
    /*// create the state
    const [info, setInfo] = useState({
      categoryId: '',
      title: '',
      details: '',
      address: '',
      contactNo: '',
      ownerName: '',
      isLakeView: 0,
      isTV: 0,
      isAC: 0,
      isWifi: 0,
      isMiniBar: 0,
      isBreakfast: 0,
      isParking: 0,
      guests: '',
      bedrooms: '',
      beds: '',
      bathrooms: '',
      rent: '',
    })
    const [photo, setPhoto] = useState(null)
  
    // get navigate function reference
    const navigate = useNavigate()
  
    const onCancel = () => {
      // go one step back in back stack
      navigate(-1)
    }
  
    const onAdd = async () => {
      const {
        title,
        details,
        address,
        contactNo,
        ownerName,
        isLakeView,
        isTV,
        isAC,
        isWifi,
        isMiniBar,
        isBreakfast,
        isParking,
        guests,
        bedrooms,
        beds,
        bathrooms,
        rent,
      } = info
      if (title.length == 0) {
        toast.warn('Please enter title')
      } else {
        const result = await addProperty(
          1,
          title,
          details,
          address,
          contactNo,
          ownerName,
          isLakeView,
          isTV,
          isAC,
          isWifi,
          isMiniBar,
          isBreakfast,
          isParking,
          guests,
          bedrooms,
          beds,
          bathrooms,
          rent,
          photo
        )
  
        if (result['status'] == 'success') {
          toast.success('Successfully added a property')
  
          // go back
          navigate(-1)
        } else {
          toast.error(result['error'])
        }
      }
      
    }*/

    return (
        <div className='container'>
            <h2 className='page-header'>Add Bus</h2>
            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Name</label>
                    <input
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}
                        type='text'
                        placeholder='Enter bus name'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Type</label>
                    <input
                        onChange={(e) => setInfo({ ...info, busType: e.target.value })}
                        type='text'
                        placeholder='Enter bus type(Volvo,Benz...)'
                        className='form-control'
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Travel Date:</label>
                    <input
                        onChange={(e) => setInfo({ ...info, travelDate: e.target.value })}
                        type='date'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Operator Name</label>
                    <input
                        onChange={(e) => setInfo({ ...info, opName: e.target.value })}
                        type='text'
                        className='form-control'
                    />
                </div>
            </div>

            <div className='row mb-3'>
                <div className='col'>
                    <label htmlFor=''>Departure Date and Time</label>
                    <input
                        onChange={(e) => setInfo({ ...info, deptTime: e.target.value })}
                        type='date'
                        className='form-control'
                    />
                    <input
                        onChange={(e) => setInfo({ ...info, deptTime: e.target.value })}
                        type='time'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Arrival Date and Time</label>
                    <input
                        onChange={(e) => setInfo({ ...info, deptTime: e.target.value })}
                        type='date'
                        className='form-control'
                    />
                    <input
                        onChange={(e) => setInfo({ ...info, deptTime: e.target.value })}
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

            <div className='row mb-3'>
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
                ))*/}
                </select>
                
            </div>

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
                        onChange={(e) => setInfo({ ...info, bathrooms: e.target.value })}
                        type='number'
                        className='form-control'
                    />
                </div>
                <div className='col'>
                    <label htmlFor=''>Total seats</label>
                    <input
                        onChange={(e) => setInfo({ ...info, rent: e.target.value })}
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
                        //onClick={onAdd}
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
 * function BusCard({ bus, onBook }) {
  return (
    <div className="bus-card">
      <h3>{bus.operatorName}</h3>
      <p>{bus.source} → {bus.destination}</p>
      <p>Departure: {bus.departureTime}</p>
      <p>Arrival: {bus.arrivalTime}</p>
      <p>Seats Available: {bus.availableSeats}</p>
      <p>Fare: ₹{bus.fare}</p>
      <button onClick={() => onBook(bus)}>Book Now</button>
    </div>
  );
}
  //additional
  function BusCard({ bus }) {
  return (
    <div className="bus-card">
      <h3>{bus.operatorName}</h3>
      <p>{bus.route.source} → {bus.route.destination}</p>
      <p>Fare: ₹{bus.fare}</p>

      { 🔸 Show Amenities }
      <div className="amenities">
        <strong>Amenities:</strong>
        <ul>
          {bus.amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

npm install react-icons
Then use like this:

jsx
Copy code
import { FaWifi, FaPlug, FaBottleWater } from "react-icons/fa6";

const iconMap = {
  "WiFi": <FaWifi />,
  "Charging": <FaPlug />,
  "Water Bottle": <FaBottleWater />
};

{bus.amenities.map((item, index) => (
  <li key={index}>
    {iconMap[item] || "•"} {item}
  </li>
))}
🎨 Example Output:
makefile
Copy code
VRL Travels
Pune → Mumbai
Fare: ₹750
Amenities:
✔️ WiFi
✔️ Charging
✔️ Water Bottle
✏️ Optional: Editable Amenity Form for Admin
If you’re building an admin form to add/update amenities, you can use checkboxes:

jsx
Copy code
const amenitiesList = ["WiFi", "Charging", "Water Bottle"];
const [selectedAmenities, setSelectedAmenities] = useState([]);

const toggleAmenity = (amenity) => {
  setSelectedAmenities(prev =>
    prev.includes(amenity)
      ? prev.filter(a => a !== amenity)
      : [...prev, amenity]
  );
};
jsx
Copy code
{amenitiesList.map((amenity, index) => (
  <label key={index}>
    <input
      type="checkbox"
      checked={selectedAmenities.includes(amenity)}
      onChange={() => toggleAmenity(amenity)}
    />
    {amenity}
  </label>
))}


Bus Object (JSON from backend)
{
  "id": 1,
  "operatorName": "VRL Travels",
  "source": "Pune",
  "destination": "Mumbai",
  "departureTime": "2025-06-20T08:00:00",
  "arrivalTime": "2025-06-20T13:00:00",
  "fare": 750,
  "totalSeats": 30,
  "availableSeats": 12,
  "isAC": true,
  "busType": "Sleeper",  // or "Seater"
  "amenities": ["WiFi", "Charging", "Water Bottle"]
}

Route (1) --- (M) Bus

Great! If your backend sends amenities like:

json
Copy code
"amenities": ["WiFi", "Charging", "Water Bottle"]
Then in your React frontend, you can display them cleanly with icons or text using a .map() loop.


 */