import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Building,
  Clock,
  Heart,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
            <p className="text-muted-foreground">
              Learn more about our story and get in touch with our team
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We&apos;re on a Mission to Redefine Shopping
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2020, our ecommerce platform was born from a simple
                idea: shopping should be easy, enjoyable, and accessible to
                everyone. What started as a small online store has grown into a
                marketplace trusted by thousands of customers worldwide.
              </p>
              <p className="text-muted-foreground mb-8">
                We believe in quality products, exceptional customer service,
                and creating a shopping experience that delights our customers
                at every step. Our team is dedicated to curating the best
                products and ensuring your satisfaction.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <Heart className="h-5 w-5" />,
                    title: "Customer First",
                  },
                  {
                    icon: <Award className="h-5 w-5" />,
                    title: "Quality Products",
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5" />,
                    title: "Trust & Security",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-primary/10 p-3 rounded-full text-primary mb-3">
                      {value.icon}
                    </div>
                    <h3 className="font-medium">{value.title}</h3>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Team</h3>
                  <p className="text-sm text-muted-foreground">
                    50+ dedicated professionals
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-muted/20 rounded-2xl p-8 border border-muted">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "2020", label: "Founded" },
                  { value: "100K+", label: "Happy Customers" },
                  { value: "10K+", label: "Products" },
                  { value: "25+", label: "Countries" },
                ].map((stat, index) => (
                  <Card key={index} className="border-muted bg-background">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions, feedback, or need assistance? We&apos;re here to
                help. Reach out to our team using any of the methods below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact info */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Contact Information
                    </h3>

                    <div className="space-y-4">
                      {[
                        {
                          icon: <Mail className="h-5 w-5" />,
                          title: "Email",
                          content: "support@example.com",
                        },
                        {
                          icon: <Phone className="h-5 w-5" />,
                          title: "Phone",
                          content: "+1 (555) 123-4567",
                        },
                        {
                          icon: <MapPin className="h-5 w-5" />,
                          title: "Address",
                          content: "123 Commerce St, New York, NY 10001",
                        },
                        {
                          icon: <Clock className="h-5 w-5" />,
                          title: "Hours",
                          content: "Mon-Fri: 9AM-6PM EST",
                        },
                        {
                          icon: <Building className="h-5 w-5" />,
                          title: "Headquarters",
                          content: "New York, USA",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full text-primary mr-4">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-muted-foreground">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">
                      Send Us a Message
                    </h3>

                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message"
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full sm:w-auto">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rounded-xl overflow-hidden border border-muted h-[400px] bg-muted/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 text-primary/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Interactive map would be displayed here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
