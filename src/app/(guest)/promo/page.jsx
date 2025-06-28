"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CardGuest } from "../_components/cards";

const PromoGuest = () => {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPromo(response.data.data);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };

    fetchPromo();
  }, []);

  // console.log(activities);
  // console.log(
  //   activities.map((item) => ({ ...item, href: `/activity/${item.id}` }))
  // );

  return (
    <div className="bg-white min-h-screen py-16 px-8 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Explore Promo
      </h1>

      <CardGuest
        data={promo.map((item) => ({
          ...item,
          href: `/promo/${item.id}`,
          image: item.imageUrl,
        }))}
      />
    </div>
  );
};

export default PromoGuest;
