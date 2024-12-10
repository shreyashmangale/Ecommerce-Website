import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist';
import Login from './auth/Login';
import SignUp from './auth/Register';
import Searched from './pages/Searched';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/products" element={<Dashboard />} />
        <Route path="/searched" element={<Searched />} />
        <Route path="/products/category" element={<Dashboard />} />
        <Route path="/singlepage" element={<ProductDetails />} />
        <Route path="/singlepage/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
