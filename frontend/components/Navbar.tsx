import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center space-x-2">
            <h2 className="underline">Keysmanager</h2>
          </Link>
        </div>

        {/* Empty Space */}
        <div className="flex-1"></div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/tokens" className={navigationMenuTriggerStyle()}>
                Tokens
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/assignments" className={navigationMenuTriggerStyle()}>
                Assignments
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;