"use client";

import DeleteConfirmationModal from "@/components/core/NModal/DeleteConfirmationModal";
import { NTable } from "@/components/core/NTable";
import TablePagination from "@/components/core/NTable/TablePagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteProduct } from "@/services/Product";
import { IMeta } from "@/types";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, PackagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DiscountModal from "./DiscountModal";

const ManageProducts = ({
  products,
  meta,
}: {
  products: IProduct[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const handleDelete = (data: IProduct) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);

        if (res.success) {
          toast.success(res.message);
          setIsOpen(false);
          setSelectedId(null);
          setSelectedItem(null);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleView = (product: IProduct) => {
    console.log("Viewing product", product);
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <span>{row.original.brand.name}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "offerPrice",
      header: "Offer Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/user/shop/products/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-primary"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">Manage Products</h1>
        <div className="flex gap-1">
          <Button
            size={"sm"}
            onClick={() => router.push("/user/shop/products/add-product")}
          >
            <span>
              <PackagePlus />
            </span>
            Add Product
          </Button>
          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <div className="my-6">
        <NTable data={products} columns={columns} />
        <DeleteConfirmationModal
          name={selectedItem}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onConfirm={handleDeleteConfirm}
        />
      </div>
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageProducts;
