import { Request, Response } from 'express';
import SiteSettings from '../../models/SiteSettings.js';

// Get current settings or seed default if none exist
export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Failed to fetch site settings' });
  }
};

// Update settings (Protected route)
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = await SiteSettings.create(updates);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, updates, { new: true, runValidators: true });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ error: 'Failed to update site settings' });
  }
};
