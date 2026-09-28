import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const oldLike = await Like.findOneAndDelete({
    video: videoId,
    likedBy: req.user?._id,
  });

  if (!oldLike) {
    const newLike = await Like.create({
      video: videoId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Video liked successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, oldLike, "Video unlike successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const oldLike = await Like.findOneAndDelete({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (!oldLike) {
    const newLike = await Like.create({
      comment: commentId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Comment liked successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, oldLike, "Comment unlike successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const oldLike = await Like.findOneAndDelete({
    tweet: tweetId,
    likedBy: req.user?._id,
  });

  if (!oldLike) {
    const newLike = await Like.create({
      tweet: tweetId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newLike, "Tweet liked successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, oldLike, "Tweet unlike successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const likedVideos = await Like.find({
    likedBy: req.user?._id,
    video: { $exists: true },
  }).populate("video");

  if (!likedVideos) {
    throw new ApiError(404, "No liked videos found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike,getLikedVideos };
