"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getToken } from "@/utilities/utils";
import Image from "next/image";

export default function DetailActivity() {
  const params = useParams();
  const { push } = useRouter();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async () => {
    const token = await getToken();

    if (!token) return push("/login");

    try {
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

      if (response.data.code !== "200") throw response;

      alert("Berhasil menambah ke keranjang!");
    } catch (error) {
      console.log("Error add to cart:", error);
    }
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${params.id}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setActivity(res?.data?.data);
      } catch (error) {
        console.log("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!activity) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Left Image */}
      <div className="w-full h-full max-h-[600px] relative rounded-lg overflow-hidden">
        <Image
          src={activity.imageUrls?.[0] || ""}
          alt={activity.title}
          className="rounded-lg object-cover w-full h-full max-h-[600px]"
          priority
          fill
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{activity.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {activity.city}, {activity.province}
          </p>
          <div className="flex items-center gap-2 text-yellow-500 text-sm mb-2">
            <span>⭐ {activity.rating}</span>
            <span className="text-gray-500">
              ({activity.total_reviews} reviews)
            </span>
          </div>

          <div className="text-xl font-semibold text-green-600 mb-2">
            Rp {activity.price.toLocaleString("id-ID")}
          </div>
          {activity.price_discount &&
            activity.price_discount > activity.price && (
              <div className="text-sm text-gray-500 line-through">
                Rp {activity.price_discount.toLocaleString("id-ID")}
              </div>
            )}

          <div className="mt-4 text-sm text-gray-700 leading-relaxed">
            {activity.description}
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <span className="font-medium">Category:</span>{" "}
            {activity.category.name}
          </div>

          <div className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Facilities:</span>{" "}
            {activity.facilities}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
