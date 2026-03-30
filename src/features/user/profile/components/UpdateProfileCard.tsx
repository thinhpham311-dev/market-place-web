"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UpdateProfileForm from "./UpdateProfileForm";

export default function UpdateProfileCard() {
  return (
    <Card className="mx-auto w-full p-3 md:p-6">
      <CardHeader className="flex flex-row items-center justify-start gap-x-3 px-0 md:px-12">
        <CardTitle>Update Profile User</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-12">
        <UpdateProfileForm />
      </CardContent>
    </Card>
  );
}
