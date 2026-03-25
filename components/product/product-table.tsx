"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/lib/features/product/productApi";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ProductTable() {
  const { data} = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted!");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Could not delete product.");
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>$ {product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={`/dashboard?editById=${product.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => handleDelete(product.id)}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
