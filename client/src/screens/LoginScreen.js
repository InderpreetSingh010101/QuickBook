import React, { useState } from 'react';

function LoginScreen() {

    
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
  

     function LoginChk(){
        
            const user = {
                
                email,
                password
            }
            console.log(user) ;
        
     }


    return (
        <div className="row justify-content-center mt-5" >
            <div className="col-md-5">

                <div className='bs'>
                    <b><h1> LoginScreen</h1></b>
                   
                    <input type="email" className="form-control mt-2" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
                    <input type="password" className="form-control mt-2" placeholder="password" onChange={(e)=>{setpassword(e.target.value)}} />
                    
                    <button className='btn btn-primary mt-2' onClick={LoginChk}>Login</button>
                </div>

            </div>

        </div>
    )
}
export default LoginScreen;