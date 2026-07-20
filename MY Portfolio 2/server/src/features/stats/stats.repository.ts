import Stats from '../../models/Stats.js';

export const getStats = async () => {
  let stats = await Stats.findOne({});
  if (!stats) {
    stats = new Stats();
    await stats.save();
  }
  return stats;
};

export const incrementVisitor = async () => {
  return await Stats.findOneAndUpdate(
    {},
    { $inc: { visitors: 1 } },
    { new: true, upsert: true }
  );
};

export const incrementLike = async () => {
  return await Stats.findOneAndUpdate(
    {},
    { $inc: { likes: 1 } },
    { new: true, upsert: true }
  );
};
