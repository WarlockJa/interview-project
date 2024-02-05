import { activeMenuAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// assigning initial atom state for activeMenu based on pathname
export default function useOnReloadActiveMenuSet() {
  const pathname = usePathname();
  const [, setActiveMenu] = useAtom(activeMenuAtom);

  useEffect(() => {
    switch (pathname) {
      case "/home":
        setActiveMenu(0);
        break;
      case "/timetables":
        setActiveMenu(1);
        break;
      case "/profile":
        setActiveMenu(2);
        break;
      case "/statistics":
        setActiveMenu(3);
        break;
      case "/logout":
        setActiveMenu(4);
        break;
      default:
        setActiveMenu(0);
        break;
    }
  }, []);

  return null;
}
