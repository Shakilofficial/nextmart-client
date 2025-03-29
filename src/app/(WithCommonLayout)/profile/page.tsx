import ProductBanner from "@/components/modules/products/Banner";
import UserProfile from "@/components/modules/user/UserProfile";
import { getMyProfile } from "@/services/userService";

const ProfilePage = async () => {
  try {
    const { data: user } = await getMyProfile();

    return (
      <div className="container mx-auto px-2 space-y-10">
        <ProductBanner title="User Profile" path="Home - User Profile" />
        <UserProfile user={user} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);

    return (
      <div className="container mx-auto px-2 space-y-10">
        <ProductBanner title="User Profile" path="Home - User Profile" />
        <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-red-600">
            Unable to load user profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
