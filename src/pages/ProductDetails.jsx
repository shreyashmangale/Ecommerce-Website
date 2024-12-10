import React, { useEffect, useState } from 'react'
import { StarRating } from '../components/StarRating'
import { useLocation } from 'react-router';
import LoadingGIF from '../assets/LoadingGIF.gif'
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import Navbar from '../components/Navbar';
import { useWishlist } from '../context/wishlistContext';


const ProductDetails = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  // console.log(id);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();


  const [itemId, setItemId] = useState(Number(id));
  const [rating, setRating] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [productsLength, setProductsLength] = useState(0);
  useEffect(()=>{
    setProductsLength(totalProducts());
  },[]);

  const totalProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    return data.length;
  }
  //console.log(productsLength)

  async function goToNextProduct() {
    if(itemId<= productsLength){
      setItemId(itemId => itemId + 1);
    }
  }

  async function goToPrevProduct() {
    if(itemId>0){
      setItemId(itemId => itemId - 1);
    }
  }
  //console.log(itemId);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        setError(error.message);
        // console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]); // Empty dependency array ensures this runs only once when the component mounts

  //   if (loading) return <div>
  //   <img src={LoadingGIF} alt="" />
  // </div>;
  if (error) return <p>Error: End of list</p>;



  return (
    <div className=' font-[montserrat]'>
      <Navbar />
      <div className='flex justify-between mb-8 bg-slate-800 py-2 px-4 sm:mt-40 mt-52'>
        <div className='flex py-2 text-gray-400'>
          <h2 className='sm:text-lg text-sm'>
            Home {'>'}
          </h2>
          <Link to={'/products'} >
            <h2 className='sm:text-lg text-sm'>
              Products {'>'}
            </h2>
          </Link>
          <h2 className='sm:text-lg text-sm'>
            Default
          </h2>
        </div>
        <div className='flex sm:gap-8 gap-2 px-6 py-2 text-gray-400'>
          <Link className="link" to={`/singlepage/${itemId - 1}`}>
            <button onClick={goToPrevProduct} className='px-2 rounded-md sm:text-lg text-sm'>Prev</button>
          </Link>

          <Link className="link" to={`/singlepage/${itemId + 1}`}>
            <button onClick={goToNextProduct} className='px-2 rounded-md sm:text-lg text-sm'>Next</button>
          </Link>
        </div>
      </div>

      {loading ?
        <div className='flex justify-center items-center'>
          <img className='w-1/2' src={LoadingGIF} alt="" />
        </div>
        : data && <div className="flex sm:flex-row flex-col sm:mx-36">
          <div className="sm:w-[50%] h-[500px] flex gap-4 border-0 border-gray-200 rounded-sm">
            <div className="img w-full h-full py-8 flex items-center justify-center">
              <img className='p-8 h-full scale-[100%]' src={data.image} alt="" />
            </div>
          </div>



          <div className="w-full sm:ms-8 sm:px-16 px-4 py-4 flex flex-col gap-2">
            <h1 className='text-3xl text-black'>{data.title}</h1>
            <div className='rating flex gap-2'>
              <StarRating rating={data.rating.rate} />
              <p>{"("}{data.rating.count} users{")"}</p>
            </div>
            <h2 className='text-2xl text-red-400'>${data.price}</h2>
            <p className='mt-2 text-gray-400'>{data.description}</p>
            <div className='flex items-center gap-4'>
              <span>Size : </span>
              <select className='p-2 border-2 rounded-sm w-[fit-content]' name="Size" id="">
                <option defaultValue disabled value="">Select Size</option>
                <option value="">Sm</option>
                <option value="">Md</option>
                <option value="">Lg</option>
                <option value="">Xl</option>
                <option value="">XXl</option>
              </select>
            </div>
            <div className='flex items-center gap-4'>
              <span>Color : </span>
              <select className='p-2 border-2 rounded-sm w-[fit-content]' name="Size" id="">
                <option defaultValue disabled value="">Select Color</option>
                <option value="">Yellow</option>
                <option value="">Pink</option>
                <option value="">Maroon</option>
                <option value="">Cream</option>
              </select>
            </div>

            <div className='flex gap-4'>

            <button className='px-4 py-2 border-2 rounded-sm border-red-300 w-[fit-content] hover:bg-red-600 hover:text-white hover:transition ease-in-out hover:duration-200' onClick={() => addToCart(data)}>Add to Cart</button>
            <button className='px-4 py-2 border-2 rounded-sm border-red-300 w-[fit-content] hover:bg-red-600 hover:text-white hover:transition ease-in-out hover:duration-200' onClick={() => addToWishlist(data)}>Add to Wishlist</button>
            </div>


          </div>
        </div>
      }



      <div className="mt-12 sm:mx-28 mx-2 p-8  h-[fit-content] border-2 rounded-lg">
        <h1>Product Information</h1>
        <p className='sm:mt-8 mt-4 text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem, odio excepturi amet tempore, impedit obcaecati ipsam soluta optio saepe mollitia dolor error beatae? Aliquid possimus dolores distinctio amet est praesentium repudiandae reiciendis! Rerum praesentium necessitatibus velit ad fugit, fugiat repudiandae distinctio quod, ut sunt exercitationem, quasi nostrum est delectus quis eos? Repellendus distinctio eaque fugiat quis excepturi eos inventore odit provident, deleniti rerum cupiditate, et cumque asperiores quod ipsam eius qui neque impedit aliquam sint.</p>
        <ul className='ms-8 text-gray-400 list-disc'>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, repellendus.</li>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, odit culpa! Mollitia, rerum impedit!</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
        <br />
        <p className='text-gray-400'>Alias aperiam dolore explicabo animi optio reprehenderit maiores, aspernatur voluptates, fuga aliquam omnis repudiandae eveniet nesciunt voluptatum vero id! Illo doloremque voluptates perferendis culpa doloribus, cumque perspiciatis veniam dolores dolorum dicta quibusdam. Veritatis consequatur iure sit tenetur amet laudantium sapiente totam vel! Quo quae nesciunt numquam cum neque autem sequi accusantium exercitationem voluptatem tempora, veritatis ut harum rerum repudiandae nobis aliquam ab obcaecati. Veritatis quidem tempora neque recusandae magnam sequi consectetur mollitia, nemo vitae?</p>
      </div>
    </div>
  )
}

export default ProductDetails