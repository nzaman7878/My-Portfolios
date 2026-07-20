import mongoose, { Schema, Document } from 'mongoose';

export interface IStats extends Document {
  visitors: number;
  projectClicks: number;
  messagesReceived: number;
  likes: number;
}

const StatsSchema: Schema = new Schema({
  visitors: { type: Number, default: 0 },
  projectClicks: { type: Number, default: 0 },
  messagesReceived: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

StatsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<IStats>('Stats', StatsSchema);
