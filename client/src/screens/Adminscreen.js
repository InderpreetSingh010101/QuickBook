import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';

function Adminscreen() {
    return (
        <div className='mt-3 m-3 bs'>
           {/* VVVV here we writed h2 as h1 contains important so font size cannot be applied*/}
            <h2 className='text-center' style={{fontSize:'30px'}}><b>Admin Panel</b></h2>
            <Tabs
                defaultActiveKey="1"
                
                items={[
                    {
                        label: `Bookings`,
                        key: '1',
                        children: <div>
                            <Bookings/>
                        </div>,
                    },
                    {
                        label: `Rooms`,
                        key: '2',
                        children: <div>
                        <h1>Rooms</h1>
                    </div>,
                    },
                    {
                        label: `All Room`,
                        key: '3',
                        children: <div>
                        <h1>All Rooms</h1>
                    </div>,
                    },
                    {
                        label: `Users`,
                        key: '4',
                        children: <div>
                        <h1>Users</h1>
                    </div>,
                    }
                ]}
            />
        </div>
    );
}

export default Adminscreen;

export function Bookings(){
    
    const[bookings , setbookings] = useState([]) ;
    const[loading , setLoading] = useState(false) ;
    const [error, setError] = useState(); 
    
    
    useEffect(()=>{
       
        async function fetchD(){
            try{
                setLoading(true)
                const data = await(await axios.get('/api/bookings/getallbookings')).data
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
    
    
    
    return(<div>

        <div className='row'>
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {bookings && (
                    <div>Total Bookings Are :{ bookings.length }</div>
                )}

            </div>

        </div>

    </div>)
}