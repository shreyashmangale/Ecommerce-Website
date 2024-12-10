import React from 'react'
import { products } from '../searchdata/db.js'
import { useSearch } from '../context/searchContext.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext.js';
import { useWishlist } from '../context/wishlistContext.js';



const Searched = () => {
    const { searchQuery } = useSearch();
    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // console.log(filteredProducts)

    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();

    return (
        <div>
            <Navbar />


            <div className='w-full h-[max-content] sm:mt-40 mt-44'>
                {
                    filteredProducts.length ?
                        <ul className='bg-gray-100 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 h-fit sm:px-32 md:px-16 px-2 gap-4 pt-8 pb-12'> {filteredProducts.map(item => <div key={item.id} className="w-full h-fit flex flex-col justify-between items-center bg-white border-2 rounded-lg sm:px-2 px-1 sm:py-4 py-2 mx-auto">
                            <div className=''>
                                <Link className="link" to={`/singlepage/${item.id}`}>
                                    <img className='h-[200px] sm:p-8 p-4' src={item.image} alt="" />
                                </Link>
                            </div>
                            <div className='text-center'>
                                <p className='text-gray-400 sm:text-lg text-xs'>{item.category}</p>
                                <Link className="link" to={`/singlepage/${item.id}`}>
                                    <h6 className='sm:text-lg text-xs'>{item.title.length > 30 ? item.title.slice(0, 30) : item.title}</h6>
                                </Link>
                                <h5 className='text-red-400'>$ {item.price}</h5>
                            </div>
                            <div className='sm:mt-4 mt-1 flex sm:flex-nowrap flex-wrap sm:gap-4 gap-2'>
                                <Link className="link" to={`/singlepage/${item.id}`}>
                                    <button className="bg-gray-800 px-2 py-1 sm:text-sm text-xs text-white rounded-lg">Read More</button>
                                </Link>
                                <button className="bg-gray-800 px-2 py-1 sm:text-sm text-xs text-white rounded-lg" onClick={() => addToCart(item)}>Add to Cart</button>
                                <button className="bg-gray-800 px-2 py-1 sm:text-sm text-xs text-white rounded-lg" onClick={() => addToWishlist(item)}>Add to Wishlist</button>
                            </div>
                        </div>)}</ul> 
                        : 
                        <h1>Search any product</h1>
                }
            </div>

            <Footer />
        </div>
    )
}

export default Searched