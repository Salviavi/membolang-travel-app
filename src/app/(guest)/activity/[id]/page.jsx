"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailActivity() {
  const params = useParams();
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(true);

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
    </div>
  );
}
