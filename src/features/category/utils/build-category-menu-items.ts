import { LinkMenuItem, MenuItem } from "@/interfaces/common/menu.interface";
import type { Category } from "@/features/category/types";

export function buildCategoryMenuItems(categories: Category[], fallbackTitle: string): MenuItem[] {
  if (!categories?.length) {
    return [];
  }

  const buildCategoryUrl = (category: Category) => {
    const categoryIds = [...(category.ancestors ?? []).filter(Boolean), category.category_id];
    return `/categories/${category.category_slug}-cat.${categoryIds.join(".")}`;
  };

  const parentCategories = categories.filter(
    (category) => !category.parent_id || category.level === 0,
  );

  return parentCategories.map((parent: Category) => {
    const directChildren =
      (parent.children?.length ?? 0) > 0
        ? parent.children!
        : categories.filter((category) => category.parent_id === parent.category_id);

    const childMenuItems: LinkMenuItem[] = directChildren.map((child) => ({
      type: "link",
      title: child.category_name || fallbackTitle,
      url: buildCategoryUrl(child),
    }));

    if (childMenuItems.length === 0) {
      return {
        type: "link" as const,
        title: parent.category_name || fallbackTitle,
        url: buildCategoryUrl(parent),
      };
    }

    return {
      type: "group" as const,
      title: parent.category_name || fallbackTitle,
      url: buildCategoryUrl(parent),
      children: childMenuItems,
    };
  });
}
