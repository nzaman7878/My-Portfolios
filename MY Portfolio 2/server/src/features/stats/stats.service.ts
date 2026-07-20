import * as repository from './stats.repository.js';

export const getStats = () => {
  return repository.incrementVisitor();
};

export const like = () => {
  return repository.incrementLike();
};
