import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  skills: string[];
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
});

SkillSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
