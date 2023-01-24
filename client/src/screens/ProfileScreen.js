import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import { Footer } from './Footer';

function ProfileScreen() {


    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }

    }, []);



    return (
        <>
        <div className='profile ml-3 m-3'>
            <Tabs
                defaultActiveKey="1"

                items={[
                    {
                        label: `Profile`,
                        key: '1',
                        children: <div>
                            <div className='row'>
                                <div className='col-md-3 m-3 bs'>
                                    <h2 className='text-center' style={{ fontSize: '25px' }}> <b>My Profile</b></h2>
                                    <br />
                                    <p className='fp'> <b>Name :</b>{user.name}</p>
                                    <p className='fp'> <b>Email :</b>{user.email}</p>
                                    <p className='fp'> <b>isAdmin :</b> {user.isAdmin ? 'YES' : 'NO'}</p>

                                </div>

                            </div>

                        </div>,
                    },
                    {
                        label: `Bookings`,
                        key: '2',
                        children: <MyBookings />,
                    }
                ]}
            />
        </div>
        <div className='ft'>
        <Footer/>
        </div>

        </>
        )
}

export default ProfileScreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const [bookings, setbookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {

        async function fetchD() {
            try {
                setLoading(true)
                const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user.id })).data
                console.log(data);
                setbookings(data);
                setLoading(false)
            } catch (e) {
                console.log(e);
                setLoading(false);
                setError(error);
            }

        }

        fetchD();


    }, []);


    async function cancelBooking(bookingid, roomid) {


        try {
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })).data
            console.log(result);
            Swal.fire('Congrats', 'Your Booking Cancelled Sucessfully', 'success').then(result => {
                window.location.reload();
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <hr />
                            <p><b>BookId</b> : {booking._id}</p>
                            <p><b>CheckIn :</b> {booking.fromdate}</p>
                            <p><b>CheckOut :</b> {booking.todate}</p>
                            <p><b>Amount :</b> {booking.totalamount}</p>
                            <p><b>Status :</b> {booking.status == 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>

                            {booking.status !== 'cancelled' && (
                                <div className='text-end'>
                                    <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>
                                </div>
                            )}

                        </div>
                    }))}
                </div>

            </div>
        </div>
        
        </>
    )
}