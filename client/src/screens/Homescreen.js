import React, { useEffect, useState } from 'react';
import axios from "axios";
import Room from '../components/Rooms';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment' ;
const { RangePicker } = DatePicker;

function Homescreen() {

    const [rooms, setrooms] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [fromDate, setfromDate] = useState();
    const [toDate, settoDate] = useState();

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

    function filterByDate(dates){
        console.log(dates) ;

        console.log(dates[0].format('DD-MM-YYYY')) ;
        console.log(dates[1].format('DD-MM-YYYY')) ;
        setfromDate(dates[0].format('DD-MM-YYYY')) ;
        settoDate(dates[1].format('DD-MM-YYYY')) ;
    }

    return (
       <div className='container'>

        <div className='row mt-5'>
            <div className='col-md-3'>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
            </div>

        </div>

         <div className="row justify-content-center mt-5">

            {loading ? (<Loader/>) : error ? (<Error/>) : (rooms.map(room => {
                return <div className="col-md-9 mt-2">
                    <Room room={room} fromDate={fromDate} toDate={toDate}/>
                </div>
            }))}

         </div>
       </div> 
    )
}
export default Homescreen;