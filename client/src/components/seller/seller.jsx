import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Seller = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isSeller, setIsSeller, navigate ,axios } = useAppContext();

  const onSubmitHandler =  async(e) => {
  try {
    console.log(e)
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="relative  w-full">
        {/* Background Image with Blur - Lowest Layer */}
        <div 
          className="fixed inset-0 z-0 bg-cover   bg-no-repeat "
          style={{ backgroundImage: `url(${assets.main_banner_bg})` }}
        ></div>
        
        {/* Dark Overlay - Middle Layer */}
        <div className="fixed inset-0 z-10 bg-black/30"></div>
        
        {/* Login Form - Top Layer */}
        <div className="relative z-20 flex min-h-screen items-center justify-center p-4">
          <form 
            className="w-full max-w-md rounded-lg bg-white bg-opacity-90 p-8 shadow-xl backdrop-blur-sm"
            onSubmit={onSubmitHandler}
          >
            <p className='mb-6 text-center text-2xl font-medium'>
              Seller <span className='text-primary'>Login</span>
            </p>

            <div className='mb-4'>
              <label className='block mb-2'>Email:</label>
              <input 
                type="email" 
                className='w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none' 
                placeholder='your@email.com' 
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
                required 
              />
            </div>

            <div className='mb-6'>
              <label className='block mb-2'>Password:</label>
              <input 
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
                type="password" 
                className='w-full rounded border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none' 
                placeholder='••••••••' 
                required
              />
            </div>
            
            <button 
              type='submit' 
              className='w-full rounded bg-primary py-2 font-medium text-white transition-colors hover:bg-primary-dark'
            > 
              Login 
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Seller;