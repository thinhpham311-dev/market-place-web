import { useState, useEffect, useCallback } from "react";
import { CarouselApi } from "@/components/ui";
import { setCurrent } from "../store/stateSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

type CarouselApis = {
    main?: CarouselApi;
    thumbnail?: CarouselApi;
};

export const useSyncCarousels = () => {
    const [apis, setApis] = useState<CarouselApis>({});
    const dispatch = useAppDispatch();
    const current = useAppSelector((state) => state.gallery.state.current);

    /** ✅ Update API references */
    const setApi = useCallback((key: keyof CarouselApis, api: CarouselApi) => {
        setApis((prev) => {
            if (prev[key] === api) return prev; // Avoid unnecessary state updates
            return { ...prev, [key]: api };
        });
    }, []);

    /** ✅ Navigate both carousels programmatically */
    const navigateTo = useCallback(
        (index: number) => {
            if (!apis.main || !apis.thumbnail) return;
            apis.thumbnail.scrollTo(index);
            apis.main.scrollTo(index);
            dispatch(setCurrent(index));
        },
        [apis.main, apis.thumbnail, dispatch]
    );

    /** ✅ Sync main & thumbnail carousels */
    useEffect(() => {
        const { main, thumbnail } = apis;
        if (!main || !thumbnail) return;

        const handleMainSelect = () => {
            const selected = main.selectedScrollSnap();
            dispatch(setCurrent(selected));
            thumbnail.scrollTo(selected);
        };

        const handleThumbnailSelect = () => {
            const selected = thumbnail.selectedScrollSnap();
            dispatch(setCurrent(selected));
            main.scrollTo(selected);
        };

        main.on("select", handleMainSelect);
        thumbnail.on("select", handleThumbnailSelect);

        return () => {
            main.off("select", handleMainSelect);
            thumbnail.off("select", handleThumbnailSelect);
        };
    }, [apis.main, apis.thumbnail, dispatch]);

    return { current, setApi, navigateTo };
};
