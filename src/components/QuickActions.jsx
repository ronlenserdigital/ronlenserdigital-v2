import { Menu as MenuIcon, X, Phone, MessageSquare, Mail, FileText } from "lucide-react";
import { MenuContainer, MenuItem } from "./ui/fluid-menu.jsx";

const PHONE = "+15403956493";
const EMAIL = "ron@ronlenserdigital.com";

/**
 * The site menu. Top right, always visible. Replaces the old hamburger and
 * full screen overlay: one control, four actions, no second layer.
 */
export function QuickActions() {
  return (
    <div
      className="fixed top-4 right-5 z-50 md:right-8"
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
