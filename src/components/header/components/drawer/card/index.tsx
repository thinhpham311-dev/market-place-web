import DecktopCard from "./desktop"
import MobileCard from "./mobile"
import { useMediaQuery } from "@/utils/hook";

export function CardDetail() {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    return <>
        {isMobile ? (
            <MobileCard />
        ) : (
            <DecktopCard />
        )}
    </>
}

export default CardDetail