import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  // FAQ categories
  const categories = [
    "All Questions",
    "Orders & Shipping",
    "Returns & Refunds",
    "Products",
    "Payment",
    "Account",
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination country and customs processing.",
      category: "Orders & Shipping",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items like personalized products or intimate apparel may not be eligible for returns.",
      category: "Returns & Refunds",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.",
      category: "Orders & Shipping",
    },
    {
      question: "Are my payment details secure?",
      answer:
        "Yes, we use industry-standard encryption and secure payment processors to ensure your payment information is protected. We are PCI DSS compliant and never store your full credit card details on our servers.",
      category: "Payment",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address and create a password. You can also sign up during the checkout process.",
      category: "Account",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team as soon as possible, and we'll do our best to accommodate your request if the order hasn't shipped yet.",
      category: "Orders & Shipping",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the shipping options available to your country during checkout.",
      category: "Orders & Shipping",
    },
    {
      question: "How do I know if a product is in stock?",
      answer:
        "If a product is available for purchase on our website, it's in stock. If an item is out of stock, it will be marked as 'Out of Stock' or 'Coming Soon' and you may have the option to join a waitlist for notification when it's back in stock.",
      category: "Products",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our products, shipping,
              returns, and more
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 h-12 rounded-lg"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 rounded-md">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="mb-10 overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* FAQ accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 py-2 border-muted"
                >
                  <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact card */}
            <Card className="mt-16 p-8 bg-muted/10 border-muted">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you can&apos;t find the answer you&apos;re looking for,
                    please contact our support team.
                  </p>
                </div>
                <Button asChild className="md:flex-shrink-0">
                  <Link href="/about">Contact Support</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
