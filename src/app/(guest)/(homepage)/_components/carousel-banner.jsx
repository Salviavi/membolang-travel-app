"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CarouselBanner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setBanners(res.data.data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-full px-20">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-48 w-full object-cover rounded-md"
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
