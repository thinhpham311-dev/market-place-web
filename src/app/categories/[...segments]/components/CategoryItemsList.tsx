"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

//ui
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// components
import { NotFound } from "@/components/layout";

// store
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { injectReducer } from "@/store";
import { getCategoryDetail } from "@/store/category/detail/dataSlice";
import reducer from "@/store/category/detail";

// types
import { ICategory } from "@/interfaces/category";

//icons
import { BiCategory } from "react-icons/bi";


injectReducer("categoriesListById", reducer);

const CategoryItemsList = ({
    mainId,
    subId,
}: {
    mainId: string;
    subId?: string;
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        detail: category = null,
        loading = false,
    } = useAppSelector((state) => state.categoriesListById.data || {});

    useEffect(() => {
        if (mainId) {
            dispatch(getCategoryDetail({ _id: mainId } as ICategory) as any);
        }
    }, [dispatch, mainId]);

    if (loading) {
        return (
            <Card className="border-none shadow-none md:px-6 px-3 space-y-5 my-6">
                <p className="text-muted-foreground text-sm">Loading...</p>
            </Card>
        );
    }

    if (!category) return <NotFound />;

    const isParentActive = category._id === mainId && !subId;
    const isChildActive = (id: string) => id === subId;

    const getButtonClass = (active: boolean) =>
        active ? "font-bold underline text-primary" : "text-muted-foreground";

    const handleNavigate = (slug: string, catId: string, parentId?: string) => {
        const isParent = !parentId || catId === parentId;
        const path = isParent
            ? `/categories/${slug}-cat.${catId}`
            : `/categories/${slug}-cat.${parentId}.${catId}`;

        if (catId !== (subId || mainId)) {
            router.push(path);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Card className="border-0 shadow-none md:px-6 px-3 flex flex-row items-center space-x-3 sticky top-[57px] bg-white z-10">
            <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold inline-flex items-center space-x-1">
                    <BiCategory />  <span>All Categories:</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex items-center space-x-3 overflow-x-auto">
                {/* Danh mục chính */}
                <Button
                    className={`p-0 text-md ${getButtonClass(isParentActive)}`}
                    variant="link"
                    onClick={() =>
                        handleNavigate(category.category_slug, category._id)
                    }
                >
                    {category.category_name}
                </Button>

                {/* Danh mục con */}
                {category.children?.map((child: ICategory) => (
                    <Button
                        key={child._id}
                        className={`p-0 text-md ${getButtonClass(isChildActive(child._id))}`}
                        variant="link"
                        onClick={() =>
                            handleNavigate(
                                child.category_slug,
                                child._id,
                                child.parent_id || category._id
                            )
                        }
                    >
                        {child.category_name}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

export default CategoryItemsList;
