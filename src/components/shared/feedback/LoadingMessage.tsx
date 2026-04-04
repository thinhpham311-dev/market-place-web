import { cn } from "@/utils/styles";

type LoadingMessageProps = {
  message?: string;
  className?: string;
};

export default function LoadingMessage({ message = "Loading...", className }: LoadingMessageProps) {
  return <div className={cn("text-center", className)}>{message}</div>;
}
