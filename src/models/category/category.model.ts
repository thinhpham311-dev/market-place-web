export interface ICategoryModel {
    _id: string,
    category_id: string,
    level: number,
    isLeaf: boolean,
    parent_id?: string,
    category_slug: string,
    category_name?: string,
    ancestors: string[]
    children?: ICategoryModel[]
    image?: string
}