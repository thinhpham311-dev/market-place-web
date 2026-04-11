import { LinkMenuItem, MenuItem } from "@/interfaces/common/menu.interface";
import type { Category } from "@/features/category/types";

export function buildCategoryMenuItems(
  categories: Category[],
  fallbackTitle: string,
): MenuItem[] {
  if (!categories?.length) {
    return [];
  }

  const buildCategoryUrl = (category: Category) => {
    const categoryIds = [...(category.ancestors ?? []).filter(Boolean), category.category_id];
    return `/categories/${category.category_slug}-cat.${categoryIds.join(".")}`;
  };

  const parentCategories: Category[] = [];
  const childrenByParentId = new Map<string, LinkMenuItem[]>();

  categories.forEach((category: Category) => {
    if (!category.parent_id || !category.isLeaf || category.level === 0) {
      parentCategories.push(category);
      return;
    }

    const existingChildren = childrenByParentId.get(category.parent_id) ?? [];
    existingChildren.push({
      type: "link",
      title: category.category_name || fallbackTitle,
      url: buildCategoryUrl(category),
    });
    childrenByParentId.set(category.parent_id, existingChildren);
  });

  return parentCategories.map((parent: Category) => {
    const children = childrenByParentId.get(parent.category_id) ?? [];

    if (children.length === 0) {
      return {
        type: "link" as const,
        title: parent.category_name || fallbackTitle,
        url: buildCategoryUrl(parent),
      };
    }

    return {
      type: "group" as const,
      title: parent.category_name || fallbackTitle,
      children,
    };
  });
}
