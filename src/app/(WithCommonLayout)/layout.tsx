import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

interface Props {
  children: React.ReactNode;
}

const CommonLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto px-4 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full mx-auto px-4 md:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
