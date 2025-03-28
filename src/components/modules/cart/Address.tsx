/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/constants/cities";
import {
  citySelector,
  shippingAddressSelector,
  updateCity,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { House } from "lucide-react";

export default function Address() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <div className="border rounded-lg shadow-sm bg-background p-4 md:p-6">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-4">
          <House className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Address</h2>
        </div>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5">
          <Select onValueChange={(city) => handleCitySelect(city)}>
            <SelectTrigger className="mb-5">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            onChange={(e) => handleShippingAddress(e.target.value)}
            rows={5}
            placeholder="Enter your shipping address"
            value={shippingAddress}
          />
        </div>
      </div>
    </div>
  );
}
