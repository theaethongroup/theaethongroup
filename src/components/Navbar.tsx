"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";

function NavbarComponent() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "#OurServicesSection" },
    { name: "About Us", link: "/#AboutUs" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappLink =
        "https://wa.me/917439315210?text=Hi%2C%20I%20want%20to%20book%20a%20call";


  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <a
              href='tel:7439301042'
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#f1c75b] text-black font-bold rounded-md hover:bg-black transition"
            >
              Call Us
            </a>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-[#f1c75b] dark:text-[#f1c75b]"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-4 py-2 bg-[#f1c75b] text-black font-bold rounded-md hover:bg-[#f1c75b] transition text-center"
              >
                Book a Call
              </a>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;