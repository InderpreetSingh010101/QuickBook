import { useState, CSSProperties } from "react";
import RotateLoader from "react-spinners/RotateLoader";

const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    marginTop:"10rem"
  };


function Loader(){

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");

   


    return (
        <div className="sweet-loading ">
      <RotateLoader

        color={color}
        loading={loading}
        cssOverride={override}
        size={20}
        
      />
    </div>
    )
}

export default Loader ;