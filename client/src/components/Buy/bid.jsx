import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../Footer";

export default function Bid() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [bids, setBids] = useState([]); // State for storing bids
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      try {
        const response = await fetch(
          `http://localhost:8000/api/auth/bid/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          setBids(data.bids);
        } else {
          console.error("Error fetching product:", response.statusText);
          if (response.status === 401) {
            navigate("/login"); // Redirect to login page if unauthorized
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading product details...
      </p>
    );
  }

  const endTime = new Date(product.DateTime);
  const currentTime = new Date();
  const timeLeft = endTime - currentTime;
  const isBidOver = timeLeft <= 0;

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (isBidOver) {
      setError("Bidding time is over");
      return;
    }

    if (!name || !email || !price) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/auth/place-bid/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in headers
          },
          body: JSON.stringify({ productId: id, name, email, price }),
        }
      );

      if (response.ok) {
        setMessage("Bid placed successfully!");
        setError("");
        setName("");
        setEmail("");
        setPrice("");

        // Fetch updated bids
        const updatedBids = await fetch(
          `http://localhost:8000/api/auth/bid/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        )
          .then((res) => res.json())
          .then((data) => data.bids);

        setBids(updatedBids);
      } else {
        const errorData = await response.json();
        if (errorData.msg === "User has already placed a bid") {
          
          setMessage("You have already placed a bid on this product.");
          

        } else {
          setError(errorData.msg || "Error placing bid");
        }
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setError("Error placing bid");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-20 p-8 flex flex-col items-center shadow-lg rounded-lg bg-white">
        <img
          className="w-80 h-80 object-cover mb-6 rounded shadow-md transition-transform transform hover:scale-105"
          src={`http://localhost:8000/${product.Image}`}
          alt={product.ProductName}
        />
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.ProductName}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Description:</strong> {product.Description}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Category:</strong> {product.Category}
          </p>
          <p className="text-2xl font-extrabold text-green-700 mb-4">
            <strong>Price:</strong> ${product.Price}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Owner Name:</strong> {product.FirstName} {product.LastName}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Email:</strong> {product.email}
          </p>
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Make Your Bid
          </h1>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleBidSubmit}
          >
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105"
            >
              Place Bid
            </button>
          </form>
          {message && (
            <p className="text-green-500 font-bold mt-4">{message}</p>
          )}
          {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
          {isBidOver && (
            <span className="text-red-500 font-bold text-lg mt-4 block">
              Bid Over
            </span>
          )}
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 mt-8">
            Bids
          </h2>
          <ul className="w-full max-w-md text-left space-y-4">
            {bids.length > 0 ? (
              bids.map((bid) => (
                <li
                  key={bid._id}
                  className="p-4 bg-gray-50 rounded shadow-md hover:bg-gray-100 transition"
                >
                  <p>
                    <strong>Name:</strong> {bid.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {bid.email}
                  </p>
                  <p>
                    <strong>Price:</strong> ${bid.price}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-700">No bids yet</p>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
