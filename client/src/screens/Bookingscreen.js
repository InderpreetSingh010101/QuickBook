import React, { useEffect, useState } from 'react';
import axios from "axios";

import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen(){

    const {roomId} = useParams() ;
    const{toDate} = useParams() ;
    const{fromDate} = useParams() ;

    const td = moment(toDate , 'DD-MM-YYYY')
    const fd =  moment(fromDate , 'DD-MM-YYYY')

    const totalDays = moment.duration(td.diff(fd)).asDays() + 1;
    

    const[loading , setLoading] = useState(true) ;
    const [room, setroom] = useState();
    const [error, setError] = useState();
    
    useEffect(() => {

        async function putData() {
            try {
                setLoading(true);
                const data = (await axios.post(`/api/rooms/getroombyid`,{roomId:roomId})).data;
                
                setroom(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        }
        putData();

    }, []);
    
    return(
        <div>
           {loading ? (<Loader/>):error ? (<Error/>) :(
            <div className='m-5' >
              <div className="row justify-content-center mt-5 bs">
                <div className="col-md-6" >
                    <h1>{room[0].name}</h1>
                    <img src={room[0].imageurls[0]} className='bigimg' />

                </div>
                {/* <div className="col-md-1 ">
               </div> */}

                <div className="col-md-6 ">
                  <div style={{textAlign:'right'}}>
                    <h1>Booking Details</h1>
                    <hr/>
                    <b>
                        <p>Name :</p>
                        <p>From Date :{fromDate}</p>
                        <p>To Date :{toDate}</p>
                        <p>Max Count : {room[0].maxcount}</p>
                    </b>

                  </div>

                  <div style={{textAlign:'right'}}>
                    <b>
                        <h1>Amount</h1>
                        <hr/>
                        <p>Total Days :{totalDays}</p>
                        <p>Rent Per Day : {room[0].rentperday}/-</p>
                        <p>Total Amount : {(room[0].rentperday) * (totalDays)}</p>

                    </b>

                  </div>

                  <div style={{float:'right'}}>
                   <button className="btn btn-primary m-2">Pay Now</button>
                  </div>
                
                </div>

              </div>


            </div>
           )}
        </div>
    );
}

export default Bookingscreen;