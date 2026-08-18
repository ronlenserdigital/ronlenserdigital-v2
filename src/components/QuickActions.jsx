import { useEffect, useState } from "react";
import { Menu as MenuIcon, X, Phone, MessageSquare, Mail, FileText } from "lucide-react";
import { MenuContainer, MenuItem } from "./ui/fluid-menu.jsx";

const PHONE = "+15403956493";
const EMAIL = "ron@ronlenserdigital.com";

/**
 * Fixed quick-action dock, bottom right.
 * One tap to call from a phone, which is the whole point of it.
 * Fades in after the hero so it does not compete with the load animation.
 */
export function QuickActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      /* raised on mobile so it clears the section rail sitting bottom centre */
      className={`fixed right-5 bottom-44 z-40 transition-all duration-500 md:right-8 md:bottom-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <MenuContainer label="Get in touch">
        <MenuItem
          label="Menu"
          icon={
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 origin-center rotate-0 scale-100 opacity-100 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-180 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:opacity-0">
                <MenuIcon size={24} strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 origin-center -rotate-180 scale-0 opacity-0 transition-all duration-300 ease-in-out [div[data-expanded=true]_&]:rotate-0 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:opacity-100">
                <X size={24} strokeWidth={1.5} />
              </div>
            </div>
          }
        />

        <MenuItem
          label="Call me"
          href={`tel:${PHONE}`}
          icon={<Phone size={22} strokeWidth={1.5} />}
        />
        <MenuItem
          label="Text me"
          href={`sms:${PHONE}`}
          icon={<MessageSquare size={22} strokeWidth={1.5} />}
        />
        <MenuItem
          label="Email me"
          href={`mailto:${EMAIL}`}
          icon={<Mail size={22} strokeWidth={1.5} />}
        />
        <MenuItem
          label="Get a quote"
          href="#quote"
          icon={<FileText size={22} strokeWidth={1.5} />}
        />
      </MenuContainer>
    </div>
  );
}
