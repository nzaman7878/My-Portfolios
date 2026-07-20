import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
}

const ExperienceSchema: Schema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
});

ExperienceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
