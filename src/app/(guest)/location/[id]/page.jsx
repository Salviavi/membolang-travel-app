"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailCategories() {
  const params = useParams();
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${params.id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(response?.data?.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!categories.name) {
    return <p>Data tidak ditemukan</p>;
  }

  return (
    <div>
      <h1>{categories.name}</h1>
    </div>
  );
}
