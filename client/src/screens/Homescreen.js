import React, { useEffect, useState } from 'react';
import axios from "axios";
import Room from '../components/Rooms';
import Loader from '../components/Loader';
import Error from '../components/Error';
function Homescreen() {

    const [rooms, setrooms] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {

        async function fetchData() {
            try {
                setLoading(true);
                const data = (await axios.get(`/api/rooms/getallrooms`)).data
                setLoading(false);

                setrooms(data);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    return (
       <div className='container'>

         <div className="row justify-content-center mt-5">

            {loading ? (<Loader/>) : error ? (<Error/>) : (rooms.map(room => {
                return <div className="col-md-9 mt-2">
                    <Room room={room}/>
                </div>
            }))}

         </div>
       </div> 
    )
}
export default Homescreen;