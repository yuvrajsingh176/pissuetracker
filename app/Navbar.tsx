'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImBug } from "react-icons/im";
import classnames from "classnames";
export const Navbar = () => {
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
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center ">
      <Link href="/">
        <ImBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((l) => (
          <li key={l.label}>
            <Link
                    className={classnames({
                        'text-zinc-900 font-bold': l.href === path,
                        'text-zinc-500': l.href !== path,
                        'hover:text-zinc-800 transition-colors':true
              })}
              href={l.href}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
