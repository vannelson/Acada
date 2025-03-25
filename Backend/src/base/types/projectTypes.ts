export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: Record<string, string>; 
    filter?: ProjectFilter; 
}

export interface ProjectFilter {
    search?: string;
    status?: string;
    name?: string;
    description?: string;
}
