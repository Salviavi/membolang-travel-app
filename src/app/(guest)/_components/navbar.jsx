"use client";

import { Button } from "@/components/ui/button";
import { deleteCookies } from "@/utilities/utils";
import axios from "axios";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Location", href: "/location" },
  { name: "Activity", href: "/activity" },
  { name: "Promo", href: "/promo" },
  { name: "Cart", href: "./cart" },
];

export const NavbarGuest = ({ token }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (!token) {
      return;
    }

    await axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await deleteCookies("token");
    await deleteCookies("userData");
    window.location.reload();
  };

  return (
    <header className="fixed w-screen left-0 inset-x-0 top-0 z-50 bg-white/10 backdrop-blur-lg">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link
              href="/login"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
