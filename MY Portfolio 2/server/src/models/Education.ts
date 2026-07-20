import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  duration: string;
  cgpa: string;
  description: string;
}

const EducationSchema: Schema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  cgpa: { type: String, required: true },
  description: { type: String, required: true },
});

EducationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<IEducation>('Education', EducationSchema);
