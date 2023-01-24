import React, { useState } from 'react';
import axios from 'axios' ;
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sucess from '../components/Sucess';
import { Footer } from "./Footer";
function RegisterScreen() {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');

    const [loading, setloading] = useState(false );
    const [error, seterror] = useState(false );
    const [sucess, setsucess] = useState(false );
    

     async function registerChk(){
        if(password == confirmpassword){
            const user = {
                name,
                email,
                password
            }
            try{
                setloading(true) ;
              const result = await (await axios.post('/api/users/register' , user)).data ;
              setloading(false) ;
              setsucess(true) ;

              setname('') ;
              setemail('');
              setpassword("");
              setconfirmpassword("") ;
              

            }catch(error){
             console.log(error) ;
             setloading(false) ;
             seterror(true) ;
            }
        }else{
            alert("Password Mismatched") ;
        }
     }


    return (
        <>
        {loading && (<Loader/>)}
        {error &&(<Error/>)}
        <div className="row justify-content-center mt-5" >
            <div className="col-md-5">
              {sucess &&(<Sucess message='Registration Sucess'/>)}

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
        <div className='ft'>

        <Footer/>
        </div>
        </>
    )
}
export default RegisterScreen;