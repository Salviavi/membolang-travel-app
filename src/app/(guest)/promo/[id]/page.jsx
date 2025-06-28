"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPromo() {
  const params = useParams();
  const [promo, setPromo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${params.id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPromo(response?.data?.data);
      } catch (error) {
        console.log("Error fetching promo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!promo.title) {
    return <p>Data tidak ditemukan</p>;
  }

  return (
    <div>
      <h1>{promo.title}</h1>
    </div>
  );
}
