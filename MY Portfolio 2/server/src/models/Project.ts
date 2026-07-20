import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  category: string;
  image: string;
  features: string[];
  views: number;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  githubLink: { type: String, required: true },
  liveLink: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  features: { type: [String], required: true },
  views: { type: Number, default: 0 },
});

// Transform _id to id in JSON response
ProjectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
