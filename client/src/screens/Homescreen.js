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
    const [duplicate, setduplicate] = useState([]);

    const[searchKey , setsearchKey] = useState('') ;
    const[type , settype] = useState('all') ;

    useEffect(() => {

        async function fetchData() {
            try {
                setLoading(true);
                const data = (await axios.get(`/api/rooms/getallrooms`)).data
                setLoading(false);
                
                setrooms(data);
                setduplicate(data) ;
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    function filterByDate(dates){
        // console.log(dates) ;

        // console.log(dates[0].format('DD-MM-YYYY')) ;
        // console.log(dates[1].format('DD-MM-YYYY')) ;
        setfromDate(dates[0].format('DD-MM-YYYY')) ;
        settoDate(dates[1].format('DD-MM-YYYY')) ;

        console.log(moment(dates[0]).format('DD-MM-YYYY'));

        var temprooms = [] ;
        var availability = false ;

        for(const room of duplicate){
            if(room.currentbookings.length >  0){

                for(const booking of room.currentbookings){
                    if(
                        !moment(dates[0].format('DD-MM-YYYY')).isBetween(
                            booking.fromdate,
                            booking.todate
                        )&&
                        !moment(dates[1].format('DD-MM-YYYY')).isBetween(
                            booking.fromdate,
                            booking.todate
                        )
                        
                    ){
                        if(
                            dates[0].format('DD-MM-YYYY') !== booking.fromdate &&
                            dates[0].format('DD-MM-YYYY') !== booking.todate &&
                            dates[1].format('DD-MM-YYYY') !== booking.fromdate &&
                            dates[1].format('DD-MM-YYYY') !== booking.todate 
                        ){
                             availability = true ;
                             console.log("yes");
                        }
                    }

                }

            }
            if(availability == true || room.currentbookings.length == 0){
                temprooms.push(room) ;
            }

            setrooms(temprooms);
        }
    }

      function filterBySearch(){
        const temprooms = duplicate.filter( room => room.name.toLowerCase().includes(searchKey.toLowerCase()));
        setrooms(temprooms) ;
      }

      function filterByType(e){
        settype(e) ;
        if( e != 'all'){
            const temprooms = duplicate.filter(room => room.type.toLowerCase() == e.toLowerCase())
            setrooms(temprooms) ;
        }else{
            setrooms(duplicate) ;
        }
      }


    return (
       <div className='container'>

        <div className='row mt-5 bs'>
           
            <div className='col-md-3'>
            <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
            </div>

        

        <div className='col-md-5'>
            <input type='Text' className='form-control' placeholder='search rooms' 
            value={searchKey} onChange={(e)=>{setsearchKey(e.target.value)}} onKeyUp={filterBySearch}/>
        </div>

        <div className='col-md-3'>
            <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non Delux</option>
            </select>
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