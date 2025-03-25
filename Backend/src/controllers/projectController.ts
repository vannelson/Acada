import { Request, Response } from "express";
import ProjectService from "../services/projectService";
import ResponseUtil from "../base/utils/response";
import cache from "../base/utils/cache"
import { PaginationParams, ProjectFilter } from "../base/types/projectTypes";

class ProjectController {
  /**
   * Get all projects with caching
   */
  static async list(req: Request, res: Response): Promise<void> {
    try {
      const cacheKey = `projects:${JSON.stringify(req.query)}`;

      // const cachedData = await cache.get(cacheKey);
      // if (cachedData) {
      //   console.log("✅ Serving from cache");
      //   return ResponseUtil.success(res, cachedData);
      // }

      const query: PaginationParams & ProjectFilter = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sortBy: req.query.sortBy ? JSON.parse(req.query.sortBy as string) : {}, // Only parse if needed
        filter: req.query.filter as ProjectFilter || {}, // Directly use req.query.filter
      };
      
      const projects = await ProjectService.getList(query);
    
      // await cache.set(cacheKey, projects, 3600);
      ResponseUtil.success(res, projects);
    } catch (error) {
      ResponseUtil.error(res, "Failed to fetch project list", error);
    }
  }

  /**
   * Create a new project
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const projectData = req.body;
      const newProject = await ProjectService.create(projectData);

      // Invalidate cache for project list
      await cache.deleteByPattern("projects:*");

      ResponseUtil.success(res, newProject, "Project created successfully", 201);
    } catch (error) {
      ResponseUtil.error(res, "Failed to create project", error);
    }
  }

  /**
   * Update a project
   */
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const projectData = req.body;
      const updatedProject = await ProjectService.update(Number(id), projectData);

      if (!updatedProject) {
        return ResponseUtil.error(res, "Project not found or not updated", null, 404);
      }
      await cache.deleteByPattern("projects:*");
      ResponseUtil.success(res, updatedProject, "Project updated successfully");
    } catch (error) {
      ResponseUtil.error(res, "Failed to update project", error);
    }
  }

  /**
   * Delete a project
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ProjectService.delete(Number(id));

      if (!deleted) {
        return ResponseUtil.error(res, "Project not found or not deleted", null, 404);
      }

      // Invalidate cache for project list and specific project
      await cache.deleteByPattern("projects:*");

      ResponseUtil.success(res, {}, "Project deleted successfully");
    } catch (error) {
      ResponseUtil.error(res, "Failed to delete project", error);
    }
  }
}

export default ProjectController;
