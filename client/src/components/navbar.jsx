import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-stone-800 text-white h-16 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-left h-full px-4">
        <div className="flex space-x-8">
          <h1 className="text-2xl font-bold">Bid&Buy</h1>
          <a href="/buy">
            <h1 className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-200">
              Buy
            </h1>
          </a>
          <a href="/sell">
            <h1 className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-200">
              Sell
            </h1>
          </a>
          <a href="/UserItem">
            <h1 className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-200">
              Items
            </h1>
          </a>


          <a href="/">
            <h1 className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-200">
              LogOut
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
}
