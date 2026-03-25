"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/lib/type/product";
import { use } from "react";
import { useAddProductMutation } from "@/lib/features/product/productApi";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  price: z.coerce.number().min(100, "Price must be at least 100"),
  description: z.string().min(5, "Description must be at least 5 characters."),
  categoryId: z.coerce.number().min(1, "Please select category"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
});

export default function ProductForm({
  getData,
  product,
  isEdit
}: {
  getData: Promise<Category[]>;
  product: Product;
  isEdit?: boolean
}) {

  const dataCategory = use(getData);

  const [addProduct, { data, isLoading, isSuccess }] = useAddProductMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const formData = new FormData();
    formData.append("file", values.image);

    const uploadRes = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
      method: "POST",
      body: formData,
    });
    const fileData = await uploadRes.json();
    
    const imageUrl = fileData.location;

    const productPayload = {
      title: values.title,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      images: [imageUrl],
    };

    await addProduct(productPayload).unwrap();
    toast.success("Product created successfully");
    
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong");
  }
}

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Product Title</FieldLabel>
            <Input placeholder="MacBook Pro 16" {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="price"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Price</FieldLabel>
            <Input type="number" placeholder="2000" {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Description</FieldLabel>
            <Textarea placeholder="Product description..." {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="categoryId"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Category</FieldLabel>

            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {dataCategory.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* IMAGE */}
      <Controller
        control={form.control}
        name="image"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Upload Image</FieldLabel>
            <Input
              type="file"
              accept="image/*"
              // We don't use {...field} here because file inputs are "uncontrolled"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file); // Stores the actual File object in Zod
                }
              }}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}
