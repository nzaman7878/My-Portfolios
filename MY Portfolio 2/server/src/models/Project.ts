import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  _id: string; // Map from 'id' to _id if we want, but let's just let Mongo generate _id and we can store id if needed, or better just use Mongoose default _id and alias it to id in toJSON.
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
