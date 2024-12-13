"use client";

import {
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    Checkbox,
} from "@/components/ui/atoms";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/molecules";
import { Control, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Path, DefaultValues, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";

// Define the OptionType interface
export interface OptionType {
    name: string;
    value: string;
}

// Define the props interface
interface IFormFieldProps<T extends FieldValues> {
    label?: string;
    name: Path<T>;
    formControl?: Control<T>;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    options?: OptionType[];
    inputType?: string;
    value?: string;
    children?: ReactNode;
    formSchema?: z.ZodType<T>;

}

interface IFormProps<T extends FieldValues> extends Omit<IFormFieldProps<T>, "name"> {
    onHandleSubmit: SubmitHandler<T>;
    defaultValues?: DefaultValues<T>;
}

// Common Form Hook
function useZodForm<T extends FieldValues>(formSchema: z.ZodType<T>, defaultValues: DefaultValues<T> = {} as DefaultValues<T>) {
    return useForm<T>({
        resolver: zodResolver(formSchema),
        defaultValues, // Now correctly typed as DefaultValues<T>
    });
}

// FormGroup Component
export function FormGroup<T extends FieldValues>({
    children,
    className,
    formSchema,
    onHandleSubmit,
    defaultValues,
}: IFormProps<T>) {
    if (!formSchema) {
        throw new Error("formSchema is required for FormGroup.");
    }
    const form = useZodForm(formSchema, defaultValues);

    return (
        <FormProvider {...form}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onHandleSubmit)} className={cn("w-full", className)}>
                    {children}
                </form>
            </Form>
        </FormProvider>
    );
}

// FormInput Component
export const FormInput = <T extends FieldValues>({
    name,
    label,
    placeholder,
    inputType = "text",
    formSchema,
    className
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormInput.");
    }

    const { control } = useFormContext<T>(); // Use form context

    return (
        <div className={cn("flex", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="w-full">
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Input
                                type={inputType}
                                placeholder={placeholder}
                                value={field.value}
                                onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

// FormSelect Component
export const FormSelect = <T extends FieldValues>({
    name,
    label,
    placeholder,
    options = [],
    formSchema,
    className
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormSelect.");
    }
    const { control } = useFormContext<T>(); // Use form context

    return (
        <div className={cn("flex", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="w-full">
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id={name} className="space-x-3">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map(({ name, value }) => (
                                        <SelectItem key={value} value={value}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

// FormCheckBox Component
export const FormCheckBox = <T extends FieldValues>({
    name,
    label,
    className,
    formSchema
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormCheckBox.");
    }
    const { control } = useFormContext<T>(); // Use form context

    return (
        <div className={cn("flex", className)}>

            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex space-x-3 rounded-md">
                        <FormControl className="mt-2">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                        {label && <FormLabel className="mb-3">{label}</FormLabel>}
                    </FormItem>
                )}
            />
        </div>
    );
};
