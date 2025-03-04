import React, { useEffect, useState } from 'react'

function ShoppingCart() {
    const [product,setProduct]=useState([]);
    const [cart,setCart]=useState([]);
    const [sideBar,SetSideBar]=useState(false);
const [toatal,setTotal]=useState(0);
const [input,setInput]=useState('');
const [serchProduct,setsearchProduct]=useState([]);
const calculateTotal = (currentCart) => {
    return currentCart.reduce((acc, item) => acc + item.price, 0);
  };
  const RemoveCart=(ind)=>{
    const newCart = cart.filter((_, index) => index !== ind);
    setCart(newCart);
  }
  const filterData=()=>{
    setsearchProduct([]);
if(input.trim()==''){
  setProduct(originalProducts);
  return;
}
const arr=[...product];
const lowerCaseInput = input.trim().toLowerCase();
    const result = arr.filter((word) =>
        word.title.trim().toLowerCase().includes(lowerCaseInput)
    );

setsearchProduct(result);
  }
   
    const addToCart=(ind)=>{
const obj=product[ind];
const newCart=[...cart,obj];
setCart(newCart);
setTotal(calculateTotal(newCart));

    }
    useEffect(() => {
        setTotal(calculateTotal(cart))
      }, [cart])
    useEffect(()=>{
        const  fetchData=async()=>{ 
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
        
                console.log('Fetched product data:', data);
              } catch (error) {
                console.error('Failed to fetch products:', error);
              }
        
         };
       fetchData();
    },[])
  return (
    <main className=' flex justify-center items-center flex-col'>
        <div className='cart bar home bar  flex w-full items-center justify-end p-5'>
<span className='hover:text-green-500 cursor-pointer font-extrabold text-xl' onClick={()=>SetSideBar(!sideBar)}>Cart</span>
        </div>
        <div className="inputBar mb-4 w-full max-w-md p-5 flex">
                <input 
                    type="text" 
                    className="w-full p-2 border-2 outline-0 border-r-0 rounded-l" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                 
                    placeholder="Search product..."
                />
                <button 
                    className="p-2 border-2 border-l-0 bg-green-500  rounded-r hover:bg-green-600" 
                    onClick={filterData}
                >
                   <span className='text-white'>Search</span>
                </button>
            </div>
            <div className='product listing flex flex-wrap w-full justify-center p-5'>
         {serchProduct.length>0?(
           serchProduct.map((value,ind)=>{
            return (<div  key={ind}  className="p-4 m-4 border w-xl h-md rounded-lg shadow-md flex flex-col items-center text-center">
             <div className="mb-3 overflow-hidden">
               <img src={value.image} className="w-50 h-50 object-contain rounded-md" alt="" />
             </div>
             <span className="text-base mb-2 break-words">{value.title}</span>
             <div className="flex justify-around w-full mb-3">
               <span className="text-sm text-gray-500 font-extrabold">Price: ${value.price}</span>
               <span className="text-sm text-gray-500">Rating: {value.rating.rate}</span>
             </div>
             {/* <span className="text-sm text-gray-700 text-left w-full break-words">
               {value.description}
             </span> */}
             <button className='text-sm text-white bg-green-500  hover:bg-green-600 p-5 rounded-2xl font-bold' onClick={()=>addToCart(ind)}>Shopping Cart</button>
           </div>);
         })
         ):(
        product.map((value,ind)=>{
           return (<div  key={ind}  className="p-4 m-4 border w-xl h-md rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="mb-3 overflow-hidden">
              <img src={value.image} className="w-50 h-50 object-contain rounded-md" alt="" />
            </div>
            <span className="text-base mb-2 break-words">{value.title}</span>
            <div className="flex justify-around w-full mb-3">
              <span className="text-sm text-gray-500 font-extrabold">Price: ${value.price}</span>
              <span className="text-sm text-gray-500">Rating: {value.rating.rate}</span>
            </div>
            {/* <span className="text-sm text-gray-700 text-left w-full break-words">
              {value.description}
            </span> */}
            <button className='text-sm text-white bg-green-500  hover:bg-green-600 p-5 rounded-2xl font-bold' onClick={()=>addToCart(ind)}>Shopping Cart</button>
          </div>);
        })
)
      }
    </div>
    {sideBar === true && cart && (
  <div className="fixed right-0 top-0 min-h-screen w-auto bg-green-400 overflow-y-auto">
    <div className="p-5 flex items-center justify-end">
      <span
        className="cursor-pointer font-extrabold text-2xl hover:text-white"
        onClick={() => SetSideBar(!sideBar)}
      >
        X
      </span>
    </div>
    {cart.map((value, ind) => {
      return (
        <div
          key={ind}
          className="p-4 m-4 bg-white border rounded-lg shadow-md flex flex-col items-center text-center"
        >
          <div className="mb-3 overflow-hidden">
            <img
              src={value.image}
              className="w-25 h-25 object-contain rounded-md"
              alt=""
            />
          </div>
          <span className="text-base mb-2 break-words">{value.title}</span>
          <div className="flex justify-around w-full mb-3">
            <span className="text-sm text-gray-500 font-extrabold">
              Price: ${value.price}
            </span>
            <span className="text-sm text-gray-500">
              Rating: {value.rating.rate}
            </span>
          </div>
          <button
            onClick={() => RemoveCart(ind)}
            className="text-sm text-white bg-green-500 hover:bg-green-600 p-5 rounded-2xl font-bold"
          >
            Remove
          </button>
        </div>
      );
    })}
    <div className="p-4">
      <p className="text-lg font-semibold">Total Price : {toatal.toFixed(2)}</p>
      <button className="text-sm text-white bg-green-500 hover:bg-green-600 p-5 rounded-2xl font-bold mt-4 w-full">
        Proceed to Pay
      </button>
    </div>
  </div>
)}
    </main>

  )
}

export default ShoppingCart
