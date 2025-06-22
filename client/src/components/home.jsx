import React, { useState } from "react";
// import Register from "./register";
import Footer from "./Footer";
import Login from "./login/login";
import Modal from "react-modal";
import Register from "./register";
import AdminLogin from "./Admin Panel/login";

Modal.setAppElement("#root");

function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const[isRegisterOpen,setIsRegisterOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false)
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };
  const openAdminLoginModal = () => {
    setIsAdminLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const closeAdminLoginModal = () => {
    setIsAdminLoginOpen(false);
  };
  const openRegisterModal = ()=>{
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }

  const closRegisterModal = ()=> setIsRegisterOpen(false);

  return (
    <div>
  <div className="min-h-screen flex flex-col relative">
    {/* Navbar */}
    <div className="bg-orange-100 flex justify-between items-center px-6 py-3 shadow-md">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src="/public/bid_3211431.png" alt="AuctionX Logo" className="h-10 w-auto" />
        <span className="ml-2 font-bold text-stone-900 text-xl">AuctionX</span>
      </div>

      {/* Action buttons on the right */}
      <div className="flex space-x-4">
        <ul className="p-2 font-bold flex ">
          <li className="mr-4 delay-20 duration-300 hover:scale-100 ease-in-out hover:-translate-y-1">
            <a href="/">Home</a>
          </li>
          <li className="mr-4 delay-20 duration-300 hover:scale-100 ease-in-out hover:-translate-y-1">
            <a href="">About Us</a>
          </li>
          <li className="mr-4 delay-20 duration-300 hover:scale-100 ease-in-out hover:-translate-y-1">
            <a href="">Contact Us</a>
          </li>
        </ul>
        <button
          onClick={openLoginModal}
          className="bg-orange-300 font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-24 h-10 delay-20 duration-300 hover:scale-105 ease-in-out hover:-translate-y-1"
        >
          Login
        </button>
        {/* <button
          onClick={openRegisterModal}
          className="bg-orange-300 font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-27 h-10"
        >
          Register
        </button> */}
        {/* <button
          onClick={openAdminLoginModal}
          className="bg-orange-300 font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-24 h-10"
        >
          Admin
        </button> */}
      </div>
    </div>

    {/* Main content */}
    <div className="bg-gradient-to-b from-stone-900 to-stone-800 text-white flex-grow py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    {/* Hero Headings */}
    <div className="mb-12">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
        <span className="inline-block bg-orange-100 text-stone-900 px-6 py-4 rounded-md shadow-md transition hover:scale-105">
          Welcome To
        </span>
        <br />
        <span className="inline-block mt-4 bg-stone-300 text-stone-900 px-6 py-4 rounded-md shadow-md transition hover:scale-105">
          AuctionX
        </span>
      </h1>
      <p className="mt-8 text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto">
        <span className="text-orange-300 font-semibold">Bid. Win. Repeat.</span> – Your premier destination for online auctions.
      </p>
      <p className="mt-4 text-lg text-slate-200 max-w-xl mx-auto">
        Discover thousands of listings, unbeatable prices, and endless opportunities in a secure and exciting bidding environment.
      </p>
    </div>

    {/* Call to Action Buttons */}
    <div className="flex justify-center gap-6 mt-8">
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
        Get Started
      </button>
      <button className="border border-orange-300 hover:bg-orange-100 hover:text-stone-900 text-orange-300 font-bold py-3 px-6 rounded-lg transition duration-300">
        Learn More
      </button>
    </div>
  </div>
</div>


  </div>





     <div className="bg-gray-100 flex flex-col lg:flex-row items-center px-6 py-12 gap-10">
  {/* Left Image */}
  <div className="lg:w-1/2 w-full">
    <img
      src="https://cdn.pixabay.com/photo/2024/07/02/06/57/ai-generated-8866846_1280.jpg"
      alt="How it works illustration"
      className="w-full h-full object-cover rounded-xl shadow-lg"
    />
  </div>

  {/* Right Text Content */}
  <div className="lg:w-1/2 w-full p-6 lg:p-12">
    <div className="mb-6">
      <h2 className="text-6xl font-extrabold text-gray-900 mb-4">
        <span className="bg-black text-white px-5 py-2 rounded inline-block transition hover:-translate-y-1 hover:scale-105 duration-300">
          But How
        </span>
        <br />
        <span className="bg-gray-300 px-5 py-2 rounded inline-block mt-4 transition hover:-translate-y-1 hover:scale-105 duration-300">
          It Works?!
        </span>
      </h2>
    </div>
    <div className="text-lg font-medium text-gray-800 space-y-4">
      <p>
        Welcome to the AuctionX Platform! Here, you'll discover a world of
        exciting deals in a secure and user-friendly environment.
      </p>
      <p>
        Whether you're a seasoned bidder or just starting out, our vibrant
        community welcomes you. Bid on thousands of listings across various
        categories—from electronics to collectibles and beyond.
      </p>
    </div>
    <div className="mt-8">
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md">
        Start Bidding Now
      </button>
    </div>
  </div>
</div>


      <div className="bg-stone-900 flex items-center">
        <div className="w-1/2 p-12">
          <h1 className="text-7xl font-extrabold bg-orange-100  py-5 px-7  inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Sell Your
          </h1>
          <h1 className="text-7xl w-120 font-extrabold mb-8 bg-stone-300  py-5 px-7 inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Item!
          </h1>
          <p className="text-lg font-semibold text-white">
            <p>
              Not only can you bid on amazing deals, but you can also sell your
              antique or unwanted items to interested buyers!
            </p>
            <br></br>
            <p>
              Our platform allows you to list your items for auction or
              fixed-price sale, making it easy to make some extra cash.
            </p>
            <br></br>
            Whether you're a individual looking to sell items or a business
            seeking to expand your reach,
            <span className="text-orange-300">
              our website provides a secure, user-friendly, and cost-effective
              way to buy and sell.
            </span>
          </p>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.pexels.com/photos/15538876/pexels-photo-15538876/free-photo-of-elderly-woman-with-microphone-during-auction.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="How it works illustration"
            className="w-full h-full object-cover mr-0.5 "
          />
        </div>
      </div>

      <div className="bg-gray-100 flex items-center">
        <div className="w-1/2">
          <img
            src="https://media.istockphoto.com/id/1365119130/photo/male-auctioneer-pointing-at-one-of-people-with-auction-paddles.jpg?s=612x612&w=0&k=20&c=5p5wJeoig3-Cyt6oQdj0Mx0U-_4UUKH4GIa1J5wG7qA="
            alt="How it works illustration"
            className="w-full h-full object-cover ml-3 "
          />
        </div>
        <div className="w-1/2 p-12">
          <h1 className="text-7xl font-extrabold bg-black py-5 px-7 text-white inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Explore Our
          </h1>
          <h1 className="text-7xl w-120 font-extrabold mb-8 bg-gray-300 py-5 px-7 inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Marketplace!
          </h1>
          <p className="text-lg font-semibold">
            <p>
              Discover a treasure trove of unique and exciting items across
              various categories! Our platform offers a vast array of products.
            </p>
            <br></br>
            <p>
              Whether you're a collector, enthusiast, or simply looking for
              something special, our marketplace has something for everyone.
              <span className="text-slate-800">
                With new items added daily, you'll always find something new and
                exciting to bid on or buy.
              </span>
            </p>
          </p>
        </div>
      </div>

      <div>
        <Modal
          isOpen={isLoginOpen}
          onRequestClose={closeLoginModal}
          contentLabel="Login Modal"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <Login closeModal={closeLoginModal} />
          </div>
        </Modal>
        <Modal
          isOpen={isAdminLoginOpen}
          onRequestClose={closeAdminLoginModal}
          contentLabel="Login Modal"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <AdminLogin closeModal={closeAdminLoginModal} />
          </div>
        </Modal>

        <Modal
          isOpen={isRegisterOpen}
          onRequestClose={closRegisterModal}
          contentLabel="Reigster Modal"
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <Register closeModal={closRegisterModal} />
          </div>
        </Modal>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
