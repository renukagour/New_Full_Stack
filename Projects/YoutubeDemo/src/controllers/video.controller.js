import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const publishVideo = asyncHandler(async (req, res) => {
  // Get title and description from the request body
  //Get the actual video file and thumbnail file from the request (uploaded files, not just URLs — your schema stores Cloudinary URLs, but the user uploads real files)
  //Upload both files to Cloudinary, get back their hosted URLs
  //Get the video's duration (Cloudinary actually returns this after upload, for video files)
  // Save a new Video document with all of this, plus owner set to whoever's logged in
  // Return a proper response
  //
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request");
  }
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }
  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!videoFileLocalPath) {
    throw new ApiError(400, "Video file is required");
  }
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }
  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoFile) {
    throw new ApiError(500, "Failed to upload video");
  }
  if (!thumbnail) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration: videoFile.duration,
    owner: req.user._id,
  });

  if (!video) {
    throw new ApiError(500, "Something went wrong while publishing the video");
  }

  res
    .status(201)
    .json(new ApiResponse(201, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user?.id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this video");
  }

  await deleteFromCloudinary(video.videoFile, "video");
  await deleteFromCloudinary(video.thumbnail, "image");

  await Video.findByIdAndDelete(videoId);

  res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnailLocalPath = req.file?.path;
  if (!title && !description && !thumbnailLocalPath) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const existingVideo = await Video.findById(videoId);
  if (!existingVideo) {
    throw new ApiError(404, "Video not found");
  }
  const updateFields = {};
  if (title) updateFields.title = title;
  if (description) updateFields.description = description;

  let oldThumbnail = null;

  if (thumbnailLocalPath) {
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail?.url) {
      throw new ApiError(500, "Failed to upload thumbnail");
    }
    oldThumbnail = existingVideo.thumbnail;
    updateFields.thumbnail = thumbnail.url;
  }

  const video = await Video.findByIdAndUpdate(videoId, updateFields, {
    new: true,
  });

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (oldThumbnail) {
    await deleteFromCloudinary(oldThumbnail, "image");
  }

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  video.isPublished = !video.isPublished;
  video.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(
      new ApiResponse(200, video, "Video publish status toggled successfully")
    );
});

const getAllVideos = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      query,
      sortBy,
      sortType,
      userId,
    } = req.query;
  
    // Step A: build the filter (only add conditions that were actually sent)
    const matchStage = {};
  
    if (userId) {
      matchStage.owner = new mongoose.Types.ObjectId(userId);
    }
  
    if (query) {
      matchStage.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }
  
    // Step B: build the sort object
    const sortStage = {};
    if (sortBy) {
      sortStage[sortBy] = sortType === "asc" ? 1 : -1;
    } else {
      sortStage.createdAt = -1; // default: newest first
    }
  
    // Step C: build the aggregation pipeline
    const pipeline = [{ $match: matchStage }, { $sort: sortStage }];
  
    // Step D: paginate it
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
  
    const videos = await Video.aggregatePaginate(
      Video.aggregate(pipeline),
      options
    );
  
    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Videos fetched successfully"));
  });

export {
  publishVideo,
  getVideoById,
  deleteVideo,
  updateVideo,
  togglePublishStatus,
  getAllVideos,
};
