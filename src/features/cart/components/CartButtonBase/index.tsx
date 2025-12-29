"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export interface ICartButtonBaseProps {
  disabled?: boolean;
  onClick?: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const CartButtonBase = ({
  disabled,
  onClick,
  size = "default",
  variant = "default",
  label,
  icon,
  className,
  ...props
}: ICartButtonBaseProps) => {
  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-2 ${className ?? ""}`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </Button>
  );
};

export default CartButtonBase;
