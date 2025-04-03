import MyShop from "@/components/modules/shop/my-shop";

const UserDashboardPage = () => {
  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted " />
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="aspect-video rounded-xl bg-muted" />
      </div>
      <MyShop />
    </div>
  );
};

export default UserDashboardPage;
