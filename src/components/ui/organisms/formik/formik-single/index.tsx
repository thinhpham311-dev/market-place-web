"use client";

import {
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    Checkbox,
    Textarea
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
    character?: string;
    formControl?: Control<T>;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    options?: OptionType[];
    inputType?: string;
    value?: string;
    children?: ReactNode;
    formSchema?: z.ZodType<T>;
    isRequired?: boolean
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
    className,
    character = "",
    isRequired = false
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormInput.");
    }

    const { control, formState: { errors } } = useFormContext<T>();

    return (
        <div className={cn("flex", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    const displayValue = field.value ? `${character}${field.value}` : "";
                    const hasError = !!errors[name];
                    return (
                        <FormItem className="w-full">
                            {label && <FormLabel>
                                {label}
                                {isRequired && <span className="text-red-500"> *</span>}
                            </FormLabel>}
                            <FormControl>
                                <Input
                                    type={inputType}
                                    placeholder={placeholder}
                                    value={displayValue} // Display value with character
                                    className={cn(
                                        "border ",
                                        hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                    )}
                                    onChange={(e) => {
                                        // Remove the `character` prefix before updating the value
                                        const rawValue = e.target.value.startsWith(character)
                                            ? e.target.value.slice(character.length)
                                            : e.target.value;
                                        field.onChange(rawValue);
                                    }}
                                    required={false} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        </div>
    );
};

// FormInput Component
export const FormInputTextarea = <T extends FieldValues>({
    name,
    label,
    placeholder,
    formSchema,
    className,
    isRequired = false
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormInput Textarea.");
    }

    const { control, formState: { errors } } = useFormContext<T>(); // Use form context

    return (
        <div className={cn("flex", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    const hasError = !!errors[name];
                    return (
                        <FormItem className="w-full">
                            {label && <FormLabel>
                                {label}
                                {isRequired && <span className="text-red-500"> *</span>}
                            </FormLabel>}
                            <FormControl>
                                <Textarea
                                    className={cn(
                                        "border ",
                                        hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                    )}
                                    placeholder={placeholder}
                                    value={field.value}
                                    onChange={field.onChange} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
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
    className,
    isRequired = false
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormSelect.");
    }
    const { control, formState: { errors } } = useFormContext<T>(); // Use form context

    return (
        <div className={cn("flex", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    const hasError = !!errors[name];
                    return (
                        <FormItem className="w-full">
                            {label && <FormLabel>
                                {label}
                                {isRequired && <span className="text-red-500"> *</span>}
                            </FormLabel>}
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value} autoComplete="off" >
                                    <SelectTrigger id={name} className={cn(
                                        "border space-x-3",
                                        hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                    )}>
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
                    )
                }}
            />
        </div>
    );
};

// FormCheckBox Component
export const FormCheckBox = <T extends FieldValues>({
    name,
    label,
    className,
    formSchema,
}: IFormFieldProps<T>) => {
    if (!formSchema) {
        throw new Error("formSchema is required for FormCheckBox.");
    }
    const { control, formState: { errors } } = useFormContext<T>();

    return (
        <div className={cn("flex items-center", className)}>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    const hasError = !!errors[name];
                    return (
                        <FormItem className="flex items-center space-y-0 space-x-3">
                            <FormControl>
                                <Checkbox
                                    className={cn(
                                        "border h-5 w-5 space-y-2",
                                        hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                    )}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            {label && (
                                <FormLabel className="text-sm font-medium">
                                    {label}
                                </FormLabel>
                            )}
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </div>
    );
};
