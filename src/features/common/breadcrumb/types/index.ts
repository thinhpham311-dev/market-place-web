export type BreadcrumbItem = {
  [key: string]: any;
};

export type GetHrefFn = (item: BreadcrumbItem) => string;
export type GetLabelFn = (item: BreadcrumbItem) => string;
