import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://reefalalsulami_db_user:blX6kos7EqBb94RU@ac-fm61asx-shard-00-00.vgde3wk.mongodb.net:27017,ac-fm61asx-shard-00-01.vgde3wk.mongodb.net:27017,ac-fm61asx-shard-00-02.vgde3wk.mongodb.net:27017/seascape?ssl=true&replicaSet=atlas-5j8u86-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

  
const reviewSchema = new mongoose.Schema({
  activityId: String,
  name: String,
  review: String,
  date: String,
});

const Review = mongoose.model("Review", reviewSchema);

// Get reviews for specific activity
app.get("/reviews/:activityId", async (req, res) => {
  try {
    const activityReviews = await Review.find({
      activityId: req.params.activityId,
    });

    res.json(activityReviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Add review
app.post("/reviews", async (req, res) => {
  try {
    const newReview = new Review({
      activityId: String(req.body.activityId),
      name: req.body.name,
      review: req.body.review,
      date: new Date().toLocaleDateString(),
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});