"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SignInForm from "./SignInForm";

export default function SignInCard() {
  return (
    <Card className="mx-auto w-full p-3 md:w-1/2 md:p-6 lg:w-1/3">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <SignInForm />
      </CardContent>
    </Card>
  );
}
