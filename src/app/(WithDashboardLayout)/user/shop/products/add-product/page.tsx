import AddProductsForm from "@/components/modules/shop/product/AddProductForm";

const AddProductPage = () => {
  return (
    <div className="border-2 border-gray-300/50 rounded-xl flex-grow max-w-4xl mx-auto p-5 my-5">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-primary">Add Product</h1>
        <p className="font-extralight text-sm text-gray-600">
          Add a new product to your shop.
        </p>
      </div>
      <AddProductsForm />
    </div>
  );
};

export default AddProductPage;
