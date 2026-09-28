import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.models.js";
import {Video} from "../models/video.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
  
    const videoStats = await Video.aggregate([
      { $match: { owner: userId } },
      {
        $group: {
          _id: null,
          totalVideos: { $sum: 1 },
          totalViews: { $sum: "$views" },
        },
      },
    ]);
  
    const totalSubscribers = await Subscription.countDocuments({ channel: userId });
  
    const videoIds = await Video.find({ owner: userId }).distinct("_id");
    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });
  
    const stats = {
      totalVideos: videoStats[0]?.totalVideos || 0,
      totalViews: videoStats[0]?.totalViews || 0,
      totalSubscribers,
      totalLikes,
    };
  
    return res
      .status(200)
      .json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
  });


const getChannelVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
  
    const videos = await Video.find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
  
    const totalVideos = await Video.countDocuments({ owner: req.user._id });
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          videos,
          totalVideos,
          page: pageNum,
          totalPages: Math.ceil(totalVideos / limitNum),
        },
        "Channel videos fetched successfully"
      )
    );
  });

export {
    getChannelStats, 
    getChannelVideos
    }