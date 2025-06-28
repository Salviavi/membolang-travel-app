"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CardGuest } from "../_components/cards";

const LocationGuest = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchCategories();
  }, []);

  // console.log(activities);
  // console.log(
  //   activities.map((item) => ({ ...item, href: `/activity/${item.id}` }))
  // );

  return (
    <div className="bg-white min-h-screen py-16 px-8 lg:px-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Explore Categories
      </h1>

      <CardGuest
        data={categories.map((item) => ({
          ...item,
          href: `/location/${item.id}`,
          image: item.imageUrl,
        }))}
      />
    </div>
  );
};

export default LocationGuest;
