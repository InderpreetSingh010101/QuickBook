import React, { useState } from 'react';

function RegisterScreen() {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');

     function registerChk(){
        if(password == confirmpassword){
            const user = {
                name,
                email,
                password
            }
            console.log(user) ;
        }else{
            alert("Password Mismatched") ;
        }
     }


    return (
        <div className="row justify-content-center mt-5" >
            <div className="col-md-5">

                <div className='bs'>
                    <b><h1> RegisterScreen</h1></b>
                    <input type="text" className="form-control" placeholder="name" onChange={(e)=>{setname(e.target.value)}}/>
                    <input type="email" className="form-control mt-2" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
                    <input type="password" className="form-control mt-2" placeholder="password" onChange={(e)=>{setpassword(e.target.value)}} />
                    <input type="password" className="form-control mt-2" placeholder="confirm password" onChange={(e)=>{setconfirmpassword(e.target.value)}}/>
                    <button className='btn btn-primary mt-2' onClick={registerChk}>Register</button>
                </div>

            </div>

        </div>
    )
}
export default RegisterScreen;