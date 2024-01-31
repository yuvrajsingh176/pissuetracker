import Link from "next/link"
import { ImBug } from "react-icons/im";


export const Navbar = () => {
    const links = [
        {
            label: "Dashboard", href: "/",
            
        },
        {
            label: "Issues", href: "/issue",

        }
    ]
    return (
            <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center ">
            <Link href="/"><ImBug/></Link>
            <ul className="flex space-x-6 ">
                {
                    links.map((l) => (
                        <li key={l.label}><Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href={l.href}>{ l.label}</Link></li>
                        
                    ))
                }
        </ul>    
</nav>

        
    )
}