import React, { forwardRef } from "react";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";

const CloseButtonTrigger = forwardRef<HTMLButtonElement>((props, ref) => (
    <AlertDialogTrigger asChild ref={ref}>
        <Button variant="link" size="icon" {...props}>
            <MdClose color="red" />
        </Button>
    </AlertDialogTrigger>
));

CloseButtonTrigger.displayName = "CloseButtonTrigger";

export default CloseButtonTrigger;
