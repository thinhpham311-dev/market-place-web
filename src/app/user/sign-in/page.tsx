"use client";
import SignInRoot from "@/features/auth/sign-in/sign-in-root";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full bg-[#ee4d2d] py-12 md:py-20 lg:py-28 min-h-[600px] flex items-center">
      <div className="container mx-auto flex items-center lg:justify-between justify-center px-4 md:px-6">
        <div className="hidden lg:flex flex-col text-white max-w-1/2 gap-y-8 relative">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-5xl font-semibold leading-tight drop-shadow-sm">
              Mua sắm thả ga
              <br />
              trên Market Place
            </h1>
            <p className="text-2xl drop-shadow-sm">
              Nền tảng thương mại điện tử yêu thích ở Đông Nam Á & Đài Loan.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform -rotate-6 hover:rotate-0 transition duration-300">
              <Image
                src="/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.avif"
                alt="Product"
                fill
                sizes="128px"
                className="object-cover bg-white"
              />
            </div>
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform rotate-3 hover:rotate-0 transition duration-300 -ml-6 z-10">
              <Image
                src="/O1CN01pTq4g71X95KxEqsrz_!!6000000002880-2-tps-200-200.avif"
                alt="Product"
                fill
                sizes="144px"
                className="object-cover bg-white"
              />
            </div>
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform -rotate-3 hover:rotate-0 transition duration-300 -ml-2">
              <Image
                src="/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.avif"
                alt="Product"
                fill
                sizes="112px"
                className="object-cover bg-white"
              />
            </div>
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform flex-shrink-0 rotate-6 hover:rotate-0 transition duration-300 -ml-4 z-10">
              <Image
                src="/O1CN01kxhWs527Gi6Fzc3zF_!!6000000007770-2-tps-200-200.avif"
                alt="Product"
                fill
                sizes="128px"
                className="object-cover bg-white"
              />
            </div>
          </div>
        </div>
        <SignInRoot />
      </div>
    </div>
  );
}
