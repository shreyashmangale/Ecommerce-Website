import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/wishlistContext';
import { useCart } from '../context/cartContext';
import { Table } from 'antd';
import { faCartShopping, faCross, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const [wishlist, setWishlist] = useState(wishlistItems);

  const { addToCart } = useCart();

  const columns = [
    {
      title: 'Title',
      key: 'title',
      align: 'center',
      render: (_, item) => (
        <div className='flex items-center justify-start'>
          <div className='sm:w-[100px] w-[40px] sm:h-[100px] h-[60px] sm:p-2 flex items-center'>
            <img className='sm:w-full w-[100%] sm:h-full h-full' src={item.image} alt="image" />
          </div>
          <div className='sm:w-[300px] w-[80px] h-[100px] flex items-center justify-start'>

            <h1 className='lg:ps-8 ps-0 md:text-sm text-xs'>{item.title}</h1>
          </div>
        </div>
      ),

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (_, item) => (
          <div className='sm:w-full w-[40px]'>
            {item.price}
          </div>
      ),
    },
    {
      title: 'Stock Status',
      key: 'stockStatus',
      align: 'center',
      render: (_, item) => (
        <h1 className='text-red-500 sm:text-lg text-xs'>In Stock</h1>
      ),
    },
    {
      title: 'Add To Cart',
      key: 'addToCart',
      align: 'center',
      className: 'text-xs',
      render: (_, item) => (
        <div className='w-full'>
              <button className='py-2 py-1 text-xs rounded-lg' onClick={()=>addToCart(item)}><FontAwesomeIcon icon={faCartShopping} color='orange' /></button>
            </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'text-xs',
      render: (_, item) => (
          <button className='sm:text-lg text-xs text-red-500' onClick={() => removeFromWishlist(item.id)}><FontAwesomeIcon icon={faRemove} color='red' /></button>
      ),
    },
  ];



  return (
    <div>
      <div className="background header sm:w-full h-[180px] flex justify-center items-center">
        <h1 className='text-4xl text-white'>Wishlist</h1>
      </div>
      <div className='flex justify-between sm:mb-8 bg-gray-50 py-2 sm:px-28 px-2 border-b-2'>
        <div className='flex py-2 text-gray-400 sm:mx-36'>
          <h2>
            Home {'>'}
          </h2>
          <Link to={'/products'} >
            <h2>
              Products {'>'}
            </h2>
          </Link>
          <h2>
            Wishlist
          </h2>
        </div>
      </div>

      <div className='md:mx-36 mx-2 flex'>
      <Table dataSource={wishlistItems} columns={columns} style={{ width: "100%" }} />
        {/* <div className='mx-auto'>
          <div className='flex'>
            <div className='px-2 flex items-center justify-center sm:w-[500px] w-[150px] h-[50px] bg-gray-100 border-r-2'>
              <h1 className='sm:text-lg text-xs'>Title</h1>
            </div>
            <div className='px-2 flex items-center justify-center sm:w-[200px] w-[60px] h-[50px] bg-gray-100 border-r-2'>
              <h1 className='sm:text-lg text-xs'>Price</h1>
            </div>
            <div className='px-2 flex items-center justify-center sm:w-[200px] w-[60px] h-[50px] bg-gray-100 border-r-2'>
              <h1 className='sm:text-lg text-xs'>Stock Status</h1>
            </div>
            <div className='px-2 flex items-center justify-center sm:w-[300px] w-[90px] h-[50px] bg-gray-100 border-r-2'>
              <h1 className='sm:text-lg text-xs'>Add to Cart</h1>
            </div>
            <div className='px-2 flex items-center justify-center sm:w-[100px] w-[50px] h-[50px] bg-gray-100'>
              <h1 className='sm:text-lg text-xs'>Action</h1>
            </div>
          </div>

          {wishlistItems.map((item) => <div className='flex mt-2'>
            <div className='sm:px-2 flex sm:flex-row flex-col items-center justify-start sm:w-[500px] w-[150px] h-[120px] bg-gray-50'>
              <div className='sm:w-[100px] w-[60px] sm:h-[100px] h-[60px] sm:p-2 flex items-center'>
                <img className='sm:w-full w-[100%] sm:h-full h-full' src={item.image} alt="image" />
              </div>
              <div className='sm:w-[250px] w-[150px] h-[100px] flex items-center justify-start'>
              <Link className="link" to={`/singlepage/${item.id}`}>
                <h1 className='sm:ps-8 ps-0 sm:text-lg text-xs'>{item.title}</h1>
                </Link>
              </div>
            </div>
            <div className='sm:px-2 flex items-center justify-center sm:w-[200px] w-[60px] h-[120px] bg-gray-50'>
              <h1 className='sm:text-lg text-xs'>{item.price}</h1>
            </div>
            <div className='px-2 flex items-center justify-center sm:w-[200px] w-[60px] h-[120px] bg-gray-50'>
              <h1 className='text-red-500 sm:text-lg text-xs'>In Stock</h1>
            </div>

            <div className='sm:px-2 flex items-center justify-center sm:w-[300px] w-[90px] h-[120px] bg-gray-50'>
              <button className='w-[90%] sm:mx-8 mx-0 sm:px-4 px-2 sm:py-2 py-1 sm:text-lg text-xs bg-amber-500 rounded-lg' onClick={()=>addToCart(item)}>Add to Cart</button>
            </div>

            <div className='px-2 flex items-center justify-center sm:w-[100px] w-[50px] h-[120px] bg-gray-50'>
              <button className='text-red-500 sm:text-lg text-xs' onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>

          </div>)}

        </div> */}


      </div>
    </div>
  )
}

export default Wishlist