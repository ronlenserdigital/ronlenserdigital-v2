import { Home, LayoutGrid, ListOrdered, Tag, Send } from "lucide-react";
import { NavBar } from "./ui/tubelight-navbar.jsx";

/**
 * The section rail. Five is the ceiling before the pills get cramped on a
 * small phone, so the deep links (Capabilities, Results) live in the
 * full screen menu overlay instead.
 */
const ITEMS = [
  { name: "Start", url: "#top", icon: Home },
  { name: "Work", url: "#work", icon: LayoutGrid },
  { name: "Process", url: "#process", icon: ListOrdered },
  { name: "Pricing", url: "#pricing", icon: Tag },
  { name: "Quote", url: "#quote", icon: Send },
];

export function SectionRail() {
  return <NavBar items={ITEMS} />;
}
