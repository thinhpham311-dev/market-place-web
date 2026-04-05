"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

interface ISocialButtonProps {
  label: string;
  link: string;
  icon: React.ReactElement;
}

export default function SocialButton({ label, link, icon }: ISocialButtonProps) {
  return (
    <Button key={label.split(" ").join("-")} variant="outline" size="icon" asChild>
      <a href={link} target="_blank" rel="noreferrer noopener" aria-label={label}>
        {icon}
      </a>
    </Button>
  );
}
