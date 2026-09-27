import mongoose from "mongoose";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  if (req.user?._id.toString() === channelId) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const oldSubscription = await Subscription.findOneAndDelete({
    subscriber: req.user?._id,
    channel: channelId,
  });

  if (!oldSubscription) {
    const newSubscription = await Subscription.create({
      subscriber: req.user?._id,
      channel: channelId,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newSubscription, "Subscribed successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, oldSubscription, "Unsubscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    console.log("channelId", channelId);
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      throw new ApiError(400, "Invalid channel id");
    }
  
    const subscribers = await Subscription.find({ channel: channelId }).populate(
      "subscriber",
      "username avatar fullName email"
    );
  
    return res
      .status(200)
      .json(new ApiResponse(200,  {
        subscriberCount: subscribers.length,
        subscribers,
      }, "Subscribers fetched successfully"));
  });

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(subscriberId)) {
    throw new ApiError(400, "Invalid Subscriber id");
  }

  const channels=await Subscription.find({subscriber:subscriberId})
  .populate("channel","username avatar fullName email")

    return res
        .status(200)
        .json(new ApiResponse(200,  {
            channelsCount: channels.length,
            channels,
          }, "Subscribed channels fetched successfully"));
});

export { toggleSubscription, getSubscribedChannels, getUserChannelSubscribers };
