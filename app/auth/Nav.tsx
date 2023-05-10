import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";

export default async function Nav() {
  const sesh = await getServerSession(authOptions);
  return (
    <nav className="flex text-center justify-between items-center py-8">
      {/* sends to home page */}
        <Link href={"/"}>
          <h1 className="text-lg text-black py-2 px-6 rounded-xl disabled:opactiy-25">
            Postability
          </h1>
        </Link>
      <ul className="flex items-center gap-6">
        {!sesh?.user && <Login />}
        {sesh?.user && <Logged image={sesh.user.image || ""} />}
      </ul>
    </nav>
  );
}
