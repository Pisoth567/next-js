"use client";

import { use } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/lib/type/product";
import { useAddProductMutation, useUpdateProductMutation } from "@/lib/features/product/productApi";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5),
  price: z.coerce.number().min(100),
  description: z.string().min(5),
  categoryId: z.coerce.number().min(1),
  image: z.any().optional(), // optional for edit
});

export default function ProductForm({
  categories,
  product,
}: {
  categories: Promise<Category[]>;
  product?: Promise<Product> | null;
}) {
  const dataCategory = use(categories);
  const productData = product ? use(product) : null;

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isEdit = !!productData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: productData?.title || "",
      price: productData?.price || 0,
      description: productData?.description || "",
      categoryId: productData?.category?.id || 0,
      image: undefined,
    },
  });

  // Reset form if editing
  if (productData) {
    form.reset({
      title: productData.title,
      price: productData.price,
      description: productData.description,
      categoryId: productData.category?.id,
      image: undefined,
    });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = productData?.images?.[0] || "";

      if (values.image) {
        const formData = new FormData();
        formData.append("file", values.image);

        const uploadRes = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
          method: "POST",
          body: formData,
        });
        const fileData = await uploadRes.json();
        imageUrl = fileData.location;
      }

      const payload = {
        title: values.title,
        price: values.price,
        description: values.description,
        categoryId: values.categoryId,
        images: [imageUrl],
      };

      if (isEdit && productData?.id) {
        await updateProduct({ id: productData.id, ...payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await addProduct(payload).unwrap();
        toast.success("Product created successfully!");
      }

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Product Title</FieldLabel>
            <Input {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Price</FieldLabel>
            <Input type="number" {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Description</FieldLabel>
            <Textarea {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="categoryId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Category</FieldLabel>
            <Select value={field.value?.toString()} onValueChange={(v) => field.onChange(Number(v))}>
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

      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Upload Image</FieldLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) field.onChange(file);
              }}
            />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" className="w-full" disabled={isAdding || isUpdating}>
        {isEdit ? (isUpdating ? "Updating..." : "Update Product") : isAdding ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}