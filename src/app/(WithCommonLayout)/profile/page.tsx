import ProductBanner from "@/components/modules/products/Banner";
import UserProfile from "@/components/modules/user/UserProfile";
import { getMyProfile } from "@/services/userService";

const ProfilePage = async () => {
  const { data: user } = await getMyProfile();
  return (
    <div className="container mx-auto px-2 space-y-10">
      <ProductBanner title="User Profile" path="Home - User Profile" />
      <UserProfile user={user} />
    </div>
  );
};

export default ProfilePage;
