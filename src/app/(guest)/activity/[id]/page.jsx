"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getToken } from "@/utilities/utils";

export default function DetailActivity() {
  const params = useParams();
  const { push } = useRouter();
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);

  const handleAddtoCart = async () => {
    const token = await getToken();

    if (!token) {
      return push("/login");
    }

    try {
      // loading
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart`,
        { activityId: params.id },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code !== "200") {
        throw response;
      }

      alert("Berhasil menambah ke keranjang!");
    } catch (error) {
      console.log("Error add to cart:", error);
    } finally {
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${params.id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setActivities(response?.data?.data);
      } catch (error) {
        console.log("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!activities.title) {
    return <p>Data tidak ditemukan</p>;
  }

  return (
    <div>
      <h1>{activities.title}</h1>

      <Button onClick={handleAddtoCart} variant="outline">
        Add to Cart
      </Button>
    </div>
  );
}
