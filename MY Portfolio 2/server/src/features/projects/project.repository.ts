import Project from '../../models/Project.js';
import Stats from '../../models/Stats.js';

export const getAllProjects = async () => {
  return await Project.find({});
};

export const getProjectById = async (id: string) => {
  return await Project.findById(id);
};

export const saveProject = async (projectData) => {
  const project = new Project(projectData);
  await project.save();
  return project;
};

export const updateProject = async (id: string, updatedData) => {
  return await Project.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteProject = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result !== null;
};

export const incrementProjectViews = async (id: string) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

  if (project) {
    const stats = await Stats.findOneAndUpdate(
      {},
      { $inc: { projectClicks: 1 } },
      { new: true, upsert: true }
    );
    return { views: project.views, totalClicks: stats.projectClicks };
  }
  return null;
};
