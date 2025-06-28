import { getCookies } from "@/utilities/utils";
import { NavbarGuest } from "./_components/navbar";
import { FooterGuest } from "./_components/footer";

export default async function LayoutGuest({ children }) {
  const token = await getCookies("token");
  return (
    <main>
      <NavbarGuest token={token} />
      <div className="pt-20">{children}</div>
      <FooterGuest />
    </main>
  );
}
