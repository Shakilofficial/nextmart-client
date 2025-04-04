import ProductBanner from "@/components/modules/products/Banner";
import UserProfile from "@/components/modules/user/UserProfile";
import { getMyProfile } from "@/services/userService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View your profile on NEXA — your online store for fashion, electronics, home essentials, and more.",
};

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
