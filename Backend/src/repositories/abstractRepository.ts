import { PrismaClient, Prisma } from "@prisma/client";

export abstract class AbstractRepository<T> {
  protected prisma: PrismaClient;
  protected model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async create(data: Prisma.Args<typeof this.model, "create">["data"]): Promise<T> {
    return this.model.create({ data });
  }

  async updateByPk(id: number | string, data: Prisma.Args<typeof this.model, "update">["data"]): Promise<T | null> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async getByPk(id: number | string): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async getAll(options?: Prisma.Args<typeof this.model, "findMany">): Promise<T[]> {
    return this.model.findMany({
      ...(options || {}),
      take: 15, // Limit for pagination
    });
  }

  async deleteByPk(id: number | string): Promise<boolean> {
    try {
      await this.model.delete({ where: { id } });
      return true;
    } catch (error) {
      return false; // Handle cases where the record doesn't exist
    }
  }
}
