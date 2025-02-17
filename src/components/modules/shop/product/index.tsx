"use client";

import DeleteConfirmationModal from "@/components/core/NModal/DeleteConfirmationModal";
import { NTable } from "@/components/core/NTable";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/Product";
import { IProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, PackagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TProductsProps = {
  products: IProduct[];
};

const ManageProducts = ({ products }: TProductsProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IProduct) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteProduct(selectedId);
        console.log(res);
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
      header: "Ofter Price",
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
        <Button
          size={"sm"}
          onClick={() => router.push("/user/shop/products/add-product")}
        >
          <span>
            <PackagePlus />
          </span>
          Add Product
        </Button>
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
    </div>
  );
};

export default ManageProducts;
