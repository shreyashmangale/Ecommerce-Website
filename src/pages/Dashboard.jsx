import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LoadingImg from '../assets/LoadingImg.gif'
import { Provider, useSelector } from 'react-redux'
import { CartContextProvider, useCart } from '../context/cartContext.js'
import { useWishlist } from '../context/wishlistContext.js'
import Footer from '../components/Footer.jsx'
import Banner from '../components/Banner.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import store from '../redux/store.js'

const Dashboard = () => {

  const [data, setData] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const categoryName = useSelector((state) => state.category);
  //console.log(categoryName);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();



  useEffect(() => {
    const fetchData = async () => {
      
      let url = 'https://fakestoreapi.com/products';

      // Modify the URL if a specific category is selected
      if (categoryName.category && categoryName.category !== '') {
        url += `/category/${categoryName.category}`;
        setCategory(categoryName.category)
      }
      try {
        setLoading(true)
        const response = await fetch(url);
        const data = await response.json();
        //console.log(url);

        setData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]); // Empty dependency array ensures this runs only once when the component mounts

  //   if (loading) return <div>
  //   <img src={LoadingGIF} alt="" />
  // </div>;
  if (error) return <p>Error: {error}</p>;


  return (
    <Provider store={store}>
      <div>
        <Navbar />

        <Banner />

        <div className='w-full h-[max-content]  font-[montserrat]'>
          {
            loading ?
              <div className='flex justify-center items-center h-[70vh]'>
                <img className='w-1/4' src={LoadingImg} alt="" />
              </div>
              :
              <div className='bg-gray-100 lg:px-32 md:px-16 px-2 pt-8' id='trending'>
                <h1 className='sm:text-3xl text-2xl text-blue-400  font-[montserrat] font-medium'>Products on Trending List</h1>

                <ul className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 h-fit gap-4 pt-8 pb-12'>

                  {data.map(item => <div key={item.id} className="w-full h-fit flex flex-col justify-between items-center bg-white border-2 rounded-lg sm:px-2 px-1 sm:py-4 py-2">
                    <div className=''>
                      <Link className="link" to={`/singlepage/${item.id}`}>
                        <img className='sm:h-[200px] h-[100px] sm:p-8 p-4' src={item.image} alt="" />
                      </Link>
                    </div>
                    <div className='text-center'>
                      <p className='text-gray-400 sm:text-sm text-xs'>{item.category}</p>
                      <Link className="link" to={`/singlepage/${item.id}`}>
                        <h6 className='sm:text-sm text-xs'>{item.title.length > 30 ? item.title.slice(0, 30) : item.title}</h6>
                      </Link>
                      <h5 className='text-red-400'>$ {item.price}</h5>
                    </div>
                    <div className='sm:mt-4 mt-1 flex justify-between w-full px-12 sm:flex-row flex-col gap-2'>
                      <Link className="link" to={`/singlepage/${item.id}`}>
                        <button className="bg-gray-800 px-2 py-1 text-xs text-white rounded-lg">Read More</button>
                      </Link>
                      <div className='flex gap-4'>
                        <button className="bg-gray-800 px-2 py-1 sm:text-sm text-xs text-white rounded-lg" onClick={() => addToWishlist(item)}>
                          <FontAwesomeIcon icon={faHeart} color='orange' />
                        </button>
                        <button className="bg-gray-800 px-2 py-1 sm:text-sm text-xs text-white rounded-lg" onClick={() => addToCart(item)}>
                          <FontAwesomeIcon icon={faCartShopping} color='orange' />
                        </button>
                      </div>
                    </div>
                  </div>)}</ul>
              </div>
          }
        </div>

        <Footer />
      </div>
    </Provider>
  )
}

export default Dashboard
