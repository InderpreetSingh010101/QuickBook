import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
function Landingscreen() {
    return (
        <div className="row landing">
            <div className="col-md-12 text-center">

            <h2 style={{color : "white"}}> Welcome To Quick Book </h2>
            
            <div className="row bx" >

            <div>
            <Carousel>

            <Carousel.Item>
        <img
          className="d-block w-100 imgg"
          src="https://images.oyoroomscdn.com/uploads/hotel_image/106719/large/f0bc6ac671d87d01.jpg"
          alt="First slide"
          />
        <Carousel.Caption>
          <h3 style={{color:"grey"}}>Townhouse 99 Rudra Inn</h3>
          <Link to='/home' >
          <button className="btn btn-primary" style={{color:"white"  }}>Click here</button>
          </Link>
          <p style={{color:"white"}}>Click to go to Booking Page</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* second page */}

      <Carousel.Item>
        <img
          className="d-block w-100 imgg"
          src="https://images.oyoroomscdn.com/uploads/hotel_image/201212/large/67fa5871cdd495c6.jpg"
          alt="Second slide"
          />
        <Carousel.Caption>
          <h3 style={{color:"black"}}>Collection O 806936 Hongkong Bazaar</h3>
          <Link to='/home' >
          <button className="btn btn-primary" style={{color:"black"}}>Click here</button>
          </Link>
          <p style={{color:"white"}}>Click to go to Booking Page</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third Page */}

      <Carousel.Item>
        <img
          className="d-block w-100 imgg"
          src="https://images.oyoroomscdn.com/uploads/hotel_image/201212/large/fe296e51150f6ecc.jpg"
          alt="Third slide"
          />
        <Carousel.Caption>
          <h3 style={{color:"black"}}>Collection O 806936 Hongkong Bazaar</h3>
          <Link to='/home' >
          <button className="btn btn-primary" style={{color:"black"}}>Click here</button>
          </Link>
          <p style={{color:"white"}}>Click to go to Booking Page</p>
        </Carousel.Caption>
      </Carousel.Item>

          </Carousel>
            </div>
            </div>
            
            
            </div>
        </div>
    )
}
export default Landingscreen;