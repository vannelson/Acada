export interface abstractInterface<T> {
    create(data: Partial<T>): Promise<T>;
    updateByPk(id: number | string, data: Partial<T>): Promise<T | null>;
    getByPk(id: number | string, options?: object): Promise<T | null>;
    getAll(options?: object): Promise<T[]>;
    deleteByPk(id: number | string): Promise<boolean>;
  }
  