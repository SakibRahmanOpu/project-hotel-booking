import React from 'react';
import { Col } from 'reactstrap';
import Data from '../../assets/Data/tours'
import Room from './Room';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const Featured = () => {
   const {data :featuredHotel} =useFetch(`${BASE_URL}/search/getFeaturedHotels`)
   console.log(featuredHotel)
  return<>{
    featuredHotel?.map(
    tour =>(
        <Col lg="3" className='mb-4' key={tour._id}> 
<Room tour={tour}/>
        </Col>
    )
  )
    }
  </>
}

export default Featured