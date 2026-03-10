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
import { insertProduct } from "@/lib/data/products";
import { Category } from "@/lib/type/product";
import { use } from "react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  price: z.coerce.number().min(1000, "Price must be at least 1000៛"),
  description: z.string().min(5, "Description must be at least 5 characters."),
  categoryId: z.coerce.number().min(1, "Please select category"),
  image: z.any().refine((file) => file instanceof File, "Image is required"),
});

export default function ProductForm({getData}:{getData: Promise<Category[]>}) {
  
  const data = use(getData);

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
    console.log("Form values:", values);

    const newProduct = {
      title: values.title,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      images: values.image,
    };
    try {
      const data = await insertProduct(newProduct);
      console.log("Inserted product:", data);
      form.reset();
      alert("Product inserted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to insert product");
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
                <SelectContent>
                    {
                      data.map(c=>(
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name}
                        </SelectItem>
                      ))
                    }
                </SelectContent>
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
              name="image"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button type="submit" className="w-full">
          Submit
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
