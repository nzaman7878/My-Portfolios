import * as repository from './stats.repository.js';

export const getStats = async () => {
  return await repository.incrementVisitor();
};

export const like = async () => {
  return await repository.incrementLike();
};
