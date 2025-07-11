import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
    const router = useRouter();

    return (
        <div className="md:flex hidden items-center space-x-1 cursor-pointer" onClick={() => router.push("/")}>
            <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" loading="lazy" width={30} height={30} alt="Market Place Logo" />
            <h3 className="font-bold uppercase lg:flex md:flex hidden">Market Place</h3>
        </div>
    );
};

export default Logo;
