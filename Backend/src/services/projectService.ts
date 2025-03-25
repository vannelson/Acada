import ProjectRepository from "../repositories/projectRepository";
import { Project } from "../interfaces/Project";
import { PaginationParams, ProjectFilter } from "../base/types/projectTypes";
import TableEntity from "../base/utils/tableEntity";

class ProjectService {

   /**
     * Get Project List
     * @param query 
     * @returns
     */
   async getList(query: PaginationParams & ProjectFilter) {
    const { page = 1, limit = 10, sortBy = {}, filter = {} } = query;
  
    const sort: [string, string][] = Object.entries(sortBy)
      .filter(([column, direction]) => typeof column === "string" && typeof direction === "string")
      .map(([column, direction]) => [column.trim(), direction.trim().toUpperCase()] as [string, string]);
  
    const projects = await ProjectRepository.listing(filter, sort, { page, limit });
  
    return {
      draw: page,
      recordsTotal: TableEntity.getTotal(),
      recordsFiltered: TableEntity.getTotal(),
      data: projects,
    };
  }

  async getAll(): Promise<Project[]> {
    return await ProjectRepository.getAll();
  }

  async getById(id: number): Promise<Project | null> {
    return await ProjectRepository.getByPk(id);
  }

  async create(data: Partial<Project>): Promise<Project> {
    return await ProjectRepository.create(data);
  }

  async update(id: number, data: Partial<Project>): Promise<Project | null> {
    return await ProjectRepository.updateByPk(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return await ProjectRepository.deleteByPk(id);
  }
}

export default new ProjectService();
