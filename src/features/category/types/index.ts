export interface ICategory {
    _id: string,
    level: number,
    isLeaf: boolean,
    parent_id?: string,
    category_slug: string,
    category_name?: string,
    ancestors: string[]
    children?: ICategory[]
    image?: string
}