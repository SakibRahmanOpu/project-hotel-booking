import img from '../calofonia.webp';
import img1 from '../calofonia.webp';
import img2 from '../calofonia.webp';

const Rooms =[



    {
        id:1,
        title: "Westminister Bridge",
        photo:img,
        desc:'Windsor Court Hotel',
        city: 'United State',
        address: "Somewhere",
 price:'৳400',
 reviews: [
    {
      name: "jhon doe",
      rating: 4.6,
    },
  ],
  maxGroupSize: 10,
 bednumber:"Double bed"

    },
    {
        id:2,
        title: "Westminister Bridge",
        photo:img1,
        desc:'Windsor Court Hotel',
        location: 'United State',
        address: "Somewhere",
        price:'৳300',
        reviews: [
            {
              name: "jhon doe",
              rating: 4.6,
            },
          ],
          maxGroupSize: 10,
        bednumber:"Single bed"


    },
    {
        id:3,
        title: "Westminister Bridge",
        photo:img2,
        desc:'Windsor Court Hotel',
        location: 'United State',
        address: "Somewhere",
        price:'৳200',
        reviews: [
            {
              name: "jhon doe",
              rating: 4.6,
            },
          ],
          maxGroupSize: 10,
        bednumber:"Double bed (seaview)"

    },
    
]

export default Rooms;
