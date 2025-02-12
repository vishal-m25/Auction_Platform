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
        <div className="bg-white flex justify-end items-center">
          <div className="p-4">
            <button
              onClick={openLoginModal}
              className="bg-orange-300 font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-24 h-10"
            >
              Login
            </button>
          </div>
          <div className="p-4">
            <button
              onClick={openRegisterModal}
              className="bg-orange-300  font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-24 h-10"
            >
              Register
            </button>
          </div>
          <div className="p-4">
            <button
              onClick={openAdminLoginModal}
              className="bg-orange-300  font-bold text-stone-900 px-6 py-2 rounded hover:bg-orange-400 transition duration-300 w-24 h-10"
            >
              Admin
            </button>
          </div>
        </div>
        <div className="bg-stone-900 flex-grow">
          <div className="text-7xl font-extrabold text-center py-12">
            <h1 className="bg-orange-100 py-5 px-7 inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Welcome To
            </h1>
            <br />
            <h1 className="bg-stone-300 py-5 px-7 inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              Bid & Buy!
            </h1>
          </div>
          <div className="text-2xl text-center font-bold mt-16 pb-10">
            <p className="text-slate-300">
              <span className="text-orange-300">Bid. Win. Repeat. - </span> Your
              premier destination for online auctions!
            </p>
            <p className="text-white">
              Discover thousands of listings, unbeatable prices, and endless
              possibilities in a safe and secure bidding environment.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 flex items-center">
        <div className="w-1/2">
          <img
            src="https://cdn.pixabay.com/photo/2024/07/02/06/57/ai-generated-8866846_1280.jpg"
            alt="How it works illustration"
            className="w-full h-full object-cover ml-3 "
          />
        </div>
        <div className="w-1/2 p-12">
          <h1 className="text-7xl font-extrabold bg-black py-5 px-7 text-white inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            But How
          </h1>
          <h1 className="text-7xl w-120 font-extrabold mb-8 bg-gray-300 py-5 px-7 inline-flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            It Works?!
          </h1>
          <p className="text-lg font-semibold">
            <p>
              Welcome to the Bid & Buy Platform! On our platform, you'll
              discover a world of exciting deals.
            </p>
            <br></br>
            <p>
              Whether you're a seasoned bidder or just starting out, we invite
              you to join our vibrant community of auction enthusiasts.{" "}
              <span className="text-slate-800">
                Bid on thousands of listings across various categories, from
                electronics to collectibles, and everything in between.{" "}
              </span>
            </p>
          </p>
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
