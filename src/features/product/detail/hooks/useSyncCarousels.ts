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
    const { current } = useAppSelector((state) => state.gallery.state);

    const setApi = useCallback((key: keyof CarouselApis, api: CarouselApi) => {
        setApis((prev) => ({ ...prev, [key]: api }));
    }, []);

    const navigateTo = useCallback(
        (index: number) => {
            if (!apis.main || !apis.thumbnail) return;
            apis.thumbnail.scrollTo(index);
            apis.main.scrollTo(index);
            dispatch(setCurrent(index));
        },
        [apis, dispatch]
    );

    useEffect(() => {
        const { main, thumbnail } = apis;
        if (!main || !thumbnail) return;

        const syncMainToThumbnail = () => {
            const selected = main.selectedScrollSnap();
            dispatch(setCurrent(selected));
            thumbnail.scrollTo(selected);
        };

        const syncThumbnailToMain = () => {
            const selected = thumbnail.selectedScrollSnap();
            dispatch(setCurrent(selected));
            main.scrollTo(selected);
        };

        main.on("select", syncMainToThumbnail);
        thumbnail.on("select", syncThumbnailToMain);

        return () => {
            main.off("select", syncMainToThumbnail);
            thumbnail.off("select", syncThumbnailToMain);
        };
    }, [dispatch, apis]);

    return {
        navigateTo,
        current,
        setApi,
    };
};
