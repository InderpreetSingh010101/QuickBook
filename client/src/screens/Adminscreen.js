import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';


function Adminscreen() {

     useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }

     },[])

    return (
        <div className='mt-3 m-3 bs'>
            {/* VVVV here we writed h2 as h1 contains important so font size cannot be applied*/}
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs
                defaultActiveKey="1"

                items={[
                    {
                        label: `Bookings`,
                        key: '1',
                        children: <div>
                            <Bookings />
                        </div>,
                    },
                    {
                        label: `Rooms`,
                        key: '2',
                        children: <div>
                            <RoomT/>
                        </div>,
                    },
                    {
                        label: `All Room`,
                        key: '3',
                        children: <div>
                            <AddUserT/>
                        </div>,
                    },
                    {
                        label: `Users`,
                        key: '4',
                        children: <div>
                            <UsersT/>
                        </div>,
                    }
                ]}
            />
        </div>
    );
}

export default Adminscreen;

export function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    useEffect(() => {

        async function fetchD() {
            try {
                setLoading(true)
                const data = await (await axios.get('/api/bookings/getallbookings')).data
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



    return (<div>

        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && (<Loader />)}
                {bookings && (
                    // <div>Total Bookings Are :{ bookings.length }</div>

                    <div>
                        <table class="table table-striped bs">
                            <thead >
                                <tr>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Room</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking=>{
                                    return<tr>
                                        <td>{booking._id}</td>
                                        <td>{booking.userid}</td>
                                        <td>{booking.room}</td>
                                        <td>{booking.fromdate}</td>
                                        <td>{booking.todate}</td>
                                        <td>{booking.status}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>

    </div>)
}

export function RoomT() {

    const [rooms, setrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    useEffect(() => {

        async function fetchD() {
            try {
                setLoading(true)
                const data = await (await axios.get('/api/rooms/getallrooms')).data
                console.log(data);
                setrooms(data);
                setLoading(false)
            } catch (e) {
                console.log(e);
                setLoading(false);
                setError(error);
            }

        }

        fetchD();


    }, []);



    return (<div>

        <div className='row'>
            <div className='col-md-12'>
                <h1>Rooms</h1>
                {loading && (<Loader />)}
                {rooms && (
                    // <div>Total Bookings Are :{ bookings.length }</div>

                    <div>
                        <table class="table table-striped bs">
                            <thead >
                                <tr>
                                    <th scope="col">Room Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">RentPerDay</th>
                                    <th scope="col">MaxCount</th>
                                    <th scope="col">Phone Number</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room=>{
                                    return<tr>
                                        <td>{room._id}</td>
                                        <td>{room.name}</td>
                                        <td>{room.type}</td>
                                        <td>{room.rentperday}</td>
                                        <td>{room.maxcount}</td>
                                        <td>{room.phonenumber}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>

    </div>)
}

export function UsersT() {

    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    useEffect(() => {

        async function fetchD() {
            try {
                setLoading(true)
                const data = await (await axios.get('/api/users/getallusers')).data
                console.log(data);
                setusers(data);
                setLoading(false)
            } catch (e) {
                console.log(e);
                setLoading(false);
                setError(error);
            }

        }

        fetchD();


    }, []);



    return (<div>

        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader />)}
                {users && (
                    // <div>Total Bookings Are :{ bookings.length }</div>

                    <div>
                        <table class="table table-striped bs">
                            <thead >
                                <tr>
                                    <th scope="col">User Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Is Admin</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user=>{
                                    return<tr>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ?'YES' : 'NO'}</td>
                                       
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>

    </div>)
}

export function AddUserT(){

    const[name ,setname] = useState('');
 const[rentperday ,setrentperday] = useState();
 const[maxcount ,setmaxcount] = useState();
 const[description ,setdescription] = useState();
 const[phonenumber ,setphonenumber] = useState();

 const[type ,settype] = useState();
 const[imageurl1 ,setimageurl1] = useState();
 const[imageurl2 ,setimageurl2] = useState();
 const[imageurl3 ,setimageurl3] = useState();


    return(
        <div className='row'>

            <div className='col-md-5'>
              <input type ="text" className='form-control ' placeholder='room name'
              value = {name} onChange={(e)=>{setname(e.target.value)}} />
              <input type ="text" className='form-control mt-2' placeholder='rent per day' 
              value = {name} onChange={(e)=>{setname(e.target.value)}}/>
              <input type ="text" className='form-control mt-2' placeholder='max count' />
              <input type ="text" className='form-control mt-2' placeholder='description' />
              <input type ="text" className='form-control mt-2' placeholder='phone number' />
            </div>
            <div className='col-md-5'>
            <input type ="text" className='form-control ' placeholder='type' />
              <input type ="text" className='form-control mt-2' placeholder='image  URL 1' />
              <input type ="text" className='form-control mt-2' placeholder='image  URL 2' />
              <input type ="text" className='form-control mt-2' placeholder='image  URL 3' />
               <div className='text-end mt-2'> 
                    <button className='btn btn-primary'>Add Room</button>
               </div>
            </div>

        </div>
    )
}