"use server";

import { cookies } from "next/headers";

export const setCookies = async (key, value) => {
  const cookie = await cookies();
  cookie.set(key, value);
};

export const deleteCookies = async (key) => {
  const cookie = await cookies();
  cookie.delete(key);
};

export const getCookies = async (key) => {
  const cookie = await cookies();
  return cookie.get(key)?.value;
};

export const getToken = async () => {
  return getCookies("token");
};
