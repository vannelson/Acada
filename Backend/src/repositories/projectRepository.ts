import { PrismaClient } from "@prisma/client";
import { AbstractRepository } from "./abstractRepository";
import { Project } from "../interfaces/Project";
import TableEntity from "../base/utils/tableEntity";
import { PaginationParams, ProjectFilter } from "../base/types/projectTypes";

const prisma = new PrismaClient();

class ProjectRepository extends AbstractRepository<Project> {
  constructor() {
    super(prisma, prisma.project);
  }

  async  listing(filter: ProjectFilter, sort: [string, string][], pagination: PaginationParams) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    console.log(skip)
    // Define filtering conditions
    const whereCondition = {
      AND: [
        filter.search
          ? {
              OR: [
                { name: { contains: filter.search } }, 
                { description: { contains: filter.search } },
              ],
            }
          : {},
        filter.name ? { name: { contains: filter.name } } : {},
        filter.status ? { status: filter.status } : {},
      ],
    };
    // Fetch total count
    const totalCount = await prisma.project.count({ where: whereCondition });
    // Fetch paginated projects
    const projects = await prisma.project.findMany({
      where: whereCondition,
      orderBy: sort.map(([column, direction]) => ({ [column]: direction.toLowerCase() })),
      take: limit,
      skip: skip,
    });
    // Store total count in TableEntity
    TableEntity.setTotal(totalCount);
    return projects;
  }

}

export default new ProjectRepository();
