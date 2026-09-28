import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const healthcheck = asyncHandler(async (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected

  const health = {
    status: dbState === 1 ? "OK" : "DEGRADED",
    uptime: process.uptime(), // seconds since the server started
    timestamp: new Date().toISOString(),
    database: dbState === 1 ? "connected" : "disconnected",
  };

  return res
    .status(dbState === 1 ? 200 : 503)
    .json(new ApiResponse(health.status === "OK" ? 200 : 503, health, "Healthcheck result"));
});

export { healthcheck };