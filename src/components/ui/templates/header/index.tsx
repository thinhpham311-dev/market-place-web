"use client"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/atoms";
import { FormGroup, FormSelect, FormInput } from "@/components/ui/organisms"
import { SidebarTrigger } from "@/components/provider"
import DropdownMode from "./dropdown-mode"
import DropdownUser from "./dropdown-user"
import DrawerCart from "./drawer-cart"
import { Search } from "lucide-react";
import { z } from "zod";

// Form schema for validation
const FormSchema = z.object({
  categories: z.string(),
  textsearch: z.string()
});

const categoriesOptions = [
  { name: "laptop", value: "laptop" },
  { name: "mobile", value: "mobile" }
];

const defaultValuesForSearchForm = { categories: "", textsearch: "" };

export default function SiteHeader() {
  const router = useRouter();
  const path = usePathname()

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background">
      <div className="flex h-14 items-center md:px-6 px-3 container mx-auto">
        <div className="flex gap-2 w-full justify-between">
          <div className="flex items-center space-x-5">
            <SidebarTrigger variant="outline" size="icon" />
            <div className="md:flex hidden items-center space-x-1 cursor-pointer" onClick={() => router.push("/")}>
              <Image src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg" width={30} height={30} alt="Market Place Logo" />
              <h3 className="font-bold uppercase lg:flex md:flex hidden">Market Place</h3>
            </div>
          </div>

          <div className="w-1/3 lg:flex md:flex hidden items-center">
            <FormGroup
              defaultValues={defaultValuesForSearchForm}
              onHandleSubmit={onSubmit}
              className="flex flex-row items-center space-x-2 w-full flex-1 justify-between"
              formSchema={FormSchema}
            >
              <FormSelect className="flex-none" name="categories" placeholder="All" options={categoriesOptions} formSchema={FormSchema} />
              <FormInput className="grow flex-1" name="textsearch" placeholder="Search..." formSchema={FormSchema} />
              <Button className="flex-none" type="submit" variant="outline" size="icon"><Search /></Button>
            </FormGroup>
          </div>

          <div className="flex items-center space-x-2">
            {path !== "/cart" && path !== "/checkout" && <DrawerCart />}
            <DropdownMode />
            <DropdownUser />
          </div>
        </div>
      </div>
    </header>
  );
}
