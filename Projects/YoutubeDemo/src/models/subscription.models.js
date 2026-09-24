import mongoose, { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who subscribing (user,me)
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //one to whom 'subscriber' is subscribing(chai aur code, code with harry)
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = model("Subscription", subscriptionSchema);

// example
//if users a b c d e 
//channel is cac, hcc,fcc
// if a want to subscribe cac => document will be subscriber-a and channel-cac
// if b want to subscribe cac => document will be subscriber-b and channel- cac
//if a want to subscribe hcc => document will be subscriber-a and channel-hcc
// if c want to subscribe fcc => document will be subscriber-c and channel- fcc
//if you want to subscribers of one channel just count documents where channel=?
//if you want find cac subscribers just find where channel=cac=>2
//if you want find which channels i subscribed just find where subscriber=you
//like you is b then find where subscriber=b=>1

