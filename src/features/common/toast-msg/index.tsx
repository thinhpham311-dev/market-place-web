// features/cart/utils/cartToast.tsx
import { toast } from "sonner";
import { ReactNode } from "react";

interface IShowToastOptions {
    title: string;
    description: ReactNode;
}

export const showSuccessToast = ({ title, description }: IShowToastOptions) => {
    const id = toast.success(title, {
        description: <span className="text-white"> {description} </span>,
        action: {
            label: "Close",
            onClick: () => toast.dismiss(id),
        },
    });
};

export const showInfoToast = ({ title, description }: IShowToastOptions) => {
    const id = toast.info(title, {
        description: <span className="text-white"> {description} </span>,
        action: {
            label: "Close",
            onClick: () => toast.dismiss(id),
        },
    });
};


export const showWarningToast = ({ title, description }: IShowToastOptions) => {
    const id = toast.warning(title, {
        description: <span className="text-white"> {description} </span>,
        action: {
            label: "Close",
            onClick: () => toast.dismiss(id),
        },
    });
};


export const showErrorToast = ({ title, description }: IShowToastOptions) => {
    const id = toast.error(title, {
        description: <span className="text-white"> {description} </span>,
        action: {
            label: "Close",
            onClick: () => toast.dismiss(id),
        },
    });
};
