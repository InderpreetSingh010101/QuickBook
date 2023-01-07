import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';

function ProfileScreen() {


    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(()=>{
        if(!user){
            window.location.href="/login" ;
        }

    },[]);



    return (
    <div className='profile ml-3 m-3'>
        <Tabs
            defaultActiveKey="1"

            items={[
                {
                    label: `Profile`,
                    key: '1',
                    children: <div>
                        <h1> My Profile</h1>
                        <br/>
                        <h1> Name :{user.name}</h1>
                        <h1> Email :{user.email}</h1>
                        <h1> isAdmin :{user.isAdmin ?'YES' : 'NO'}</h1>

                    </div>,
                },
                {
                    label: `Bookings`,
                    key: '2',
                    children: <MyBookings/>,
                }
            ]}
        />
    </div>)
}

export default ProfileScreen;

export function MyBookings(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
   
    const[bookings,setbookings] = useState([]);
    const[loading , setLoading] = useState(false) ;
    const [error, setError] = useState();
     useEffect(()=>{
       
        async function fetchD(){
            try{
                setLoading(true)
                const data = await(await axios.post('/api/bookings/getbookingsbyuserid',{userid:user.id})).data
                console.log(data);
                setbookings(data);
                setLoading(false)
                }catch(e){
                 console.log(e) ;
                 setLoading(false);
                 setError(error);
                }

        }

        fetchD() ;


     },[]);
    
     return(
        <div>
            <div className='row'>
                <div className='col-md-6'>
                   {loading && (<Loader/>)}
                   {bookings && (bookings.map(booking=>{
                    return <div className='bs'>
                        <h1>{booking.room}</h1>
                        <hr/>
                        <p><b>BookId</b> : {booking._id}</p>
                        <p><b>CheckIn :</b> {booking.fromdate}</p>
                        <p><b>CheckOut :</b> {booking.todate}</p>
                        <p><b>Amount :</b> {booking.totalamount}</p>
                        <p><b>Status :</b> {booking.status == 'booked'?'CONFIRMED' : 'CANCELLED'}</p>
                        
                        <div className='text-end'>
                             <button className='btn btn-primary'>CANCEL BOOKING</button>
                        </div>

                    </div>
                   }))}
                </div>

            </div>
        </div>
    )
}