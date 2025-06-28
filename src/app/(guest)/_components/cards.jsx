import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export const CardGuest = ({ data = [] }) => {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {(data || []).map((item) => (
        <Card
          key={item.id}
          className="shadow-md hover:shadow-lg transition duration-300"
        >
          <CardHeader>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <CardTitle className="mt-4">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              This is one of our featured.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              href={item.href || "#"}
              className="text-indigo-600 font-medium"
            >
              Explore more →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
