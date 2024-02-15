"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImBug } from "react-icons/im";
import classnames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
const Navbar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3  ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <ImBug />
            </Link>
            <Navlinks />
          </Flex>
          <Authstatus />
        </Flex>
      </Container>
    </nav>
  );
};
const Navlinks = () => {
  const path = usePathname();
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
  );
};
const Authstatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" height="28px" />;
  if (status === "unauthenticated") {
    return (
      <Link
        href="/api/auth/signin"
        className="bg-black text-white px-2 py-1   rounded-md"
      >
        Signin
      </Link>
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="cursor-pointer">
          <DropdownMenu.Label>
            <Text size="4">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Signout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default Navbar;
