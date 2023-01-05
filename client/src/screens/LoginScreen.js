import React, { useState } from 'react';
import axios from 'axios' ;
import Loader from '../components/Loader';
import Error from '../components/Error';
function LoginScreen() {

    
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    
    const [loading, setloading] = useState(false );
    const [error, seterror] = useState(false );
    const [sucess, setsucess] = useState(false );

     async function LoginChk(){
        
            const user = {
                
                email,
                password
            }
            try{
                setloading(true) ;
                const result = await (await axios.post('/api/users/login' , user)).data ;
                setloading(false);

                localStorage.setItem('currentUser' , JSON.stringify(result));
                window.location.href='/home';
  
              }catch(error){
               console.log(error) ;
               setloading(false ) ;
               seterror(true) ;
              }
        console.log(user) ;
     }


    return (<>
    {loading && <Loader/>}
        <div className="row justify-content-center mt-5" >
            <div className="col-md-5">
                {error && (<Error message = "INVALID Creadentials"/>)}

                <div className='bs'>
                    <b><h1> LoginScreen</h1></b>
                   
                    <input type="email" className="form-control mt-2" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
                    <input type="password" className="form-control mt-2" placeholder="password" onChange={(e)=>{setpassword(e.target.value)}} />
                    
                    <button className='btn btn-primary mt-2' onClick={LoginChk}>Login</button>
                </div>

            </div>

        </div>
    </>
    )
}
export default LoginScreen;