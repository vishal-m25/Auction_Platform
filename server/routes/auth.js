const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const productDetails = require("../models/sell");
const multer = require("multer");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config");
const bidPrice = require("../models/Bid");
const cron = require("node-cron");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = require("../secretKey");
const authMiddleware = require("../middleware/authMiddleware");
const feedbacks = require("../models/Feedback");
const admin = require("../admin");
const adminAuthMiddleWare = require("../middleware/adminauthmiddleware")

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const REDIRECT_URI = config.REDIRECT_URI;
const REFRESH_TOKEN = config.REFRESH_TOKEN;

const oAuth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to, subject, text) {
  try {
    const accesstoken = await oAuth2client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "anjaliiisharma007@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesstoken,
      },
    });

    const mailOptions = {
      from: "Bid&Buy.com <anjaliiisharma007@gmail.com>",
      to,
      subject,
      text,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// Sign Up
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User Already exists" });
    }

    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//admin signup

// Admin login route
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  // Fixed admin credentials
  const ADMIN_EMAIL = admin.email;
  const ADMIN_PASSWORD = admin.password;
 

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Generate JWT token for admin
    const payload = { role: 'admin' };
    jwt.sign(payload, secret.key, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, user: { id: user._id, email: user.email } });
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


// Sign In
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
     
      },
    };

    jwt.sign(payload, secret.key, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Sell Form
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/sell",
  upload.single("Image"),
  authMiddleware,
  async (req, res) => {
    const userId = req.user.id;
    const {
      FirstName,
      LastName,
      email,
      ProductName,
      Description,
      Category,
      Price,
      DateTime,
    } = req.body;

    try {
      const imagepath = req.file ? req.file.path : "";
      let details = new productDetails({
        userId,
        FirstName,
        LastName,
        email,
        ProductName,
        Description,
        Category,
        Image: imagepath,
        Price,
        DateTime,
      });

      await details.save();
      return res.status(201).json({ msg: "Auction Placed" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get Products
router.get("/buy", async (req, res) => {
  try {
    const products = await productDetails.find({}).select("-__v -updatedAt");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Product Details and Associated Bids
router.get("/bid/:id", async (req, res) => {
  try {
    const product = await productDetails.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const bids = await bidPrice
      .find({ productId: req.params.id })
      .sort({ price: -1 });

    res.json({ product, bids });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Place a New Bid
router.post("/place-bid", authMiddleware, async (req, res) => {
  const { productId, name, email, price } = req.body;
  const userId = req.user.id;

  if (!productId || !name || !email || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existbid = await bidPrice.findOne({ productId, userId });
    if (existbid) {
      existBid.price = price;
      await existBid.save();
      return res.json({ msg: "Bid updated successfully" });
    }
    const bid = new bidPrice({ productId, userId, name, email, price });
    await bid.save();

    return res.status(201).json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Error placing bid:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
});

router.get("/UserItem", authMiddleware, async (req, res) => {
  try {
    const products = await productDetails.find({ userId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming authMiddleware attaches user info to req.user

    // Find the product by ID and verify the owner
    const product = await productDetails.findOne({
      _id: productId,
      userId: userId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    // Delete the product
    await productDetails.deleteOne({ _id: productId });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete(
  "/delete/admin/:productId",
  adminAuthMiddleWare,
  async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await productDetails.findOne({ _id: productId });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await productDetails.deleteOne({ _id: productId });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.post("/feedback", authMiddleware, async (req, res) => {
  const { feedback } = req.body;
  const userId = req.user.id;
  try {
    const message = new feedbacks({ userId, feedback });
    await message.save();
    return res.status(201).json({ message: "Feedback Sends Sucessfully" });
  } catch (error) {
    console.error("Error Sending Feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/feedbacks",async(req,res)=>{

  try {
    const userFeedbacks = await feedbacks.find({});
    res.json(userFeedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})

async function handleBidEnd(productId) {
  try {
    const bids = await bidPrice.findOne({ productId }).sort({ price: -1 });

    if (bids.length === 0) {
      console.log("No bids placed for product:", productId);
      return;
    }

    const highestBid = bids[0];

    // Notify the winner
    await sendMail(
      highestBid.email,
      "Congratulations! You Won the Bid",
      `Dear User, You have won the bid for product ID: ${productId}`
    );

    // Notify the other bidders
    for (let i = 1; i < bids.length; i++) {
      const bid = bids[i];
      await sendMail(
        bid.email,
        "Bid Result: You Did Not Win the Bid",
        `Dear User, Unfortunately, you did not win the bid for product ID: ${productId}`
      );
    }

    // Mark the product as processed
    await productDetails.updateOne(
      { _id: productId },
      { $set: { processed: true } }
    );

    console.log("Email notifications sent for product ID:", productId);
  } catch (error) {
    console.error("Error handling bid end for product ID:", productId, error);
  }
}

// Schedule to check for bid endings
(async function checkBids() {
  try {
    const now = new Date();
    const products = await productDetails.find({
      DateTime: { $lte: now },
      processed: { $ne: true },
    });

    for (const product of products) {
      await handleBidEnd(product._id);
    }
  } catch (error) {
    console.error("Error checking for ended bids:", error);
  }
  setTimeout(checkBids, 60000);
})();


module.exports = router;
