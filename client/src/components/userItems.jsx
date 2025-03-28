import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function BuyCards() {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(
          "http://localhost:8000/api/auth/UserItem",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setProducts(data);

          const initialTimeLeft = {};
          data.forEach((product) => {
            initialTimeLeft[product._id] =
              new Date(product.DateTime) - new Date();
          });
          setTimeLeft(initialTimeLeft);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTimeLeft = { ...prevTimeLeft };
        Object.keys(updatedTimeLeft).forEach((productId) => {
          const product = products.find((p) => p._id === productId);
          if (product) {
            const endTime = new Date(product.DateTime);
            updatedTimeLeft[productId] = endTime - new Date();
          }
        });
        return updatedTimeLeft;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [products]);

  const handleBidClick = (product) => {
    navigate(`/bid/${product._id}`);
  };

  const handleDeleteClick = async (productId) => {
    console.log("Attempting to delete product with ID:", productId); // Debugging statement
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        `http://localhost:8000/api/auth/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete product: ${errorData.message}`);
      }

      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
        {products.map((product) => {
          const timeRemaining = timeLeft[product._id] || 0;
          const isBidOver = timeRemaining <= 0;

          const hours = Math.floor(
            (timeRemaining % (1000 * 3600 * 24)) / (1000 * 3600)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 3600)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          return (
            <div
              key={product._id}
              className="bg-gray-800 w-full h-auto max-w-sm rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl flex flex-col"
            >
              <div>
                <img
                  className="h-52 w-full object-cover rounded-t-lg"
                  src={`http://localhost:8000/${product.Image}`}
                  alt={product.ProductName}
                />
              </div>
              <div className="pt-4 pl-4 pr-4 pb-2 flex-1">
                <h1 className="font-bold text-2xl text-white">
                  {product.ProductName}
                </h1>
                <p className="text-gray-400 mt-2">
                  {product.Description.length > 100
                    ? `${product.Description.substring(0, 100)}...`
                    : product.Description}
                </p>
              </div>
              <div className="pt-4 pl-4 pr-4 pb-4 flex flex-col justify-between">
                {isBidOver ? (
                  <span className="text-red-500 font-bold text-xl">
                    Auction Ended
                  </span>
                ) : (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-400 font-bold text-2xl">
                      ₹{product.Price}
                    </span>
                    <button
                      onClick={() => handleBidClick(product)}
                      className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Bid
                    </button>
                  </div>
                )}
                {!isBidOver && (
                  <p className="text-gray-400 text-sm">
                    Time Left: {hours}h {minutes}m {seconds}s
                  </p>
                )}
                <button
                  onClick={() => handleDeleteClick(product._id)}
                  className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
