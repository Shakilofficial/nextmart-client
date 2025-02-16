import CreateShopForm from "@/components/modules/shop/CreateShopForm";
import Logo from "@/components/shared/Logo";

const CreateShopPage = () => {
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl mx-auto p-5 my-5">
      <div className="flex items-center space-x-4 mb-8 justify-center border-b-2 border-primary/40 pb-5">
        <Logo />
        <div className="border-l-2 border-primary/40 pl-4">
          <h1 className="text-xl font-semibold text-primary">Create Your Shop</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <CreateShopForm />
    </div>
  );
};

export default CreateShopPage;
