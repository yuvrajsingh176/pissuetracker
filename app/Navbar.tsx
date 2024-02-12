"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImBug } from "react-icons/im";
import classnames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
export const Navbar = () => {
  const path = usePathname();
  const { status, data: session } = useSession();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className=" border-b mb-5 px-5 py-3  ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <ImBug />
            </Link>
            <ul className="flex space-x-6 ">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    className={classnames({
                      "text-zinc-900 font-bold": l.href === path,
                      "text-zinc-500": l.href !== path,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Signout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Signin</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
