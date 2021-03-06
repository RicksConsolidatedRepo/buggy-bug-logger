import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
import { dbContext } from "../db/DbContext"

const Note = new Schema({
title: { type: String, required: true },
modifiedDate: { type: Date },
bugId: { type: ObjectId, ref: 'Bug', required: true },
flagged: { type: String, enum: ["pending", "completed", "rejected"] },
creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

  export default Note