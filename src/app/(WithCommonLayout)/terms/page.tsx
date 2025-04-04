import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Scale, Shield } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Policies",
  description:
    "Our commitment to transparency, privacy, and fair business practices",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Terms & Policies
            </h1>
            <p className="text-muted-foreground">
              Our commitment to transparency, privacy, and fair business
              practices
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="terms" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  <span>Terms</span>
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </TabsTrigger>
                <TabsTrigger value="refund" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Refund</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="terms" className="mt-6">
                <div className="bg-white rounded-lg border border-muted p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Terms of Service
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Last updated: April 2, 2025
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        1. Introduction
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        Welcome to our ecommerce platform. These Terms of
                        Service (&quot;Terms&quot;) govern your use of our
                        website, services, and products. By accessing or using
                        our platform, you agree to be bound by these Terms.
                        services, and products. By accessing or using our
                        platform, you agree to be bound by these Terms.
                      </p>
                      <p className="text-muted-foreground">
                        Please read these Terms carefully before using our
                        services. If you do not agree with any part of these
                        Terms, you may not use our platform.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2. Account Registration
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        To access certain features of our platform, you may need
                        to register for an account. You agree to provide
                        accurate, current, and complete information during the
                        registration process and to update such information to
                        keep it accurate, current, and complete.
                      </p>
                      <p className="text-muted-foreground">
                        You are responsible for safeguarding your password and
                        for all activities that occur under your account. You
                        agree to notify us immediately of any unauthorized use
                        of your account.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        3. Products and Services
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We strive to display our products and their features
                        accurately. However, the actual colors, dimensions, and
                        details you see on your computer may depend on your
                        monitor, and we cannot guarantee that your
                        monitor&apos;s display will be accurate.
                      </p>
                      <p className="text-muted-foreground">
                        We reserve the right to limit the quantities of any
                        products or services that we offer. All descriptions of
                        products and pricing are subject to change at any time
                        without notice.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        4. Purchases and Payment
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        When you make a purchase, you agree to provide a valid
                        payment method. By submitting your payment information,
                        you authorize us to charge your payment method for the
                        total amount of your order, including taxes and shipping
                        charges where applicable.
                      </p>
                      <p className="text-muted-foreground">
                        All payments are processed securely through our payment
                        processors. We do not store your full credit card
                        details on our servers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        5. Shipping and Delivery
                      </h3>
                      <p className="text-muted-foreground">
                        We will make every effort to ship products within the
                        timeframes indicated on our website. However, shipping
                        times are estimates and not guaranteed. We are not
                        responsible for delays caused by carriers, customs, or
                        other factors outside our control.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="privacy" className="mt-6">
                <div className="bg-white rounded-lg border border-muted p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                    <p className="text-muted-foreground mb-4">
                      Last updated: April 2, 2025
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        1. Information We Collect
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We collect several types of information from and about
                        users of our website, including:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                          Personal information such as name, email address,
                          postal address, phone number, and payment information
                          when you register or make a purchase.
                        </li>
                        <li>
                          Information about your internet connection, the
                          equipment you use to access our website, and usage
                          details.
                        </li>
                        <li>
                          Information collected through cookies, web beacons,
                          and other tracking technologies.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2. How We Use Your Information
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We use the information we collect about you for various
                        purposes, including:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>To present our website and its contents to you.</li>
                        <li>
                          To process and fulfill your orders, including shipping
                          and payment processing.
                        </li>
                        <li>
                          To provide you with information, products, or services
                          that you request from us.
                        </li>
                        <li>
                          To notify you about changes to our website or any
                          products or services we offer.
                        </li>
                        <li>
                          To improve our website, products, services, marketing,
                          and customer relationships.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        3. Disclosure of Your Information
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We may disclose personal information that we collect or
                        you provide:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>To our subsidiaries and affiliates.</li>
                        <li>
                          To contractors, service providers, and other third
                          parties we use to support our business.
                        </li>
                        <li>
                          To fulfill the purpose for which you provide it.
                        </li>
                        <li>
                          For any other purpose disclosed by us when you provide
                          the information.
                        </li>
                        <li>
                          To comply with any court order, law, or legal process.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="refund" className="mt-6">
                <div className="bg-white rounded-lg border border-muted p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
                    <p className="text-muted-foreground mb-4">
                      Last updated: April 2, 2025
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        1. Return Eligibility
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        We offer a 30-day return policy for most items. To be
                        eligible for a return, your item must be in the same
                        condition that you received it, unworn or unused, with
                        tags, and in its original packaging.
                      </p>
                      <p className="text-muted-foreground">
                        Certain types of items cannot be returned, including:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Personalized or custom-made items</li>
                        <li>Digital products</li>
                        <li>Gift cards</li>
                        <li>Intimate items (for health and hygiene reasons)</li>
                        <li>Perishable goods</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2. Return Process
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        To initiate a return, please follow these steps:
                      </p>
                      <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                        <li>
                          Log in to your account and go to your order history.
                        </li>
                        <li>
                          Select the order containing the item(s) you wish to
                          return.
                        </li>
                        <li>
                          Click on &quot;Return Items&quot; and follow the
                          instructions.
                        </li>
                        <li>
                          Print the return shipping label (if provided) and
                          securely package the item(s).
                        </li>
                        <li>
                          Ship the package using the return shipping label or
                          your preferred carrier.
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">3. Refunds</h3>
                      <p className="text-muted-foreground mb-3">
                        Once we receive and inspect your return, we will notify
                        you of the approval or rejection of your refund. If
                        approved, your refund will be processed, and a credit
                        will automatically be applied to your original method of
                        payment within 5-10 business days.
                      </p>
                      <p className="text-muted-foreground">
                        Please note that depending on your credit card company,
                        it may take an additional 2-10 business days after your
                        credit is applied for it to post to your account.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="bg-muted/10 rounded-lg p-6 border border-muted text-center">
              <p className="text-sm text-muted-foreground mb-2">
                These policies were last updated on April 2, 2025 and are
                subject to change.
              </p>
              <p className="text-sm">
                If you have any questions about our terms or policies, please{" "}
                <Link href="/about" className="text-primary hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
