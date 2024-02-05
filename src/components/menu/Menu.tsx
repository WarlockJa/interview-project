"use client";
import { BarChartIcon } from "../svg/BarChartIcon";
import { CalendarIcon } from "../svg/CalendarIcon";
import { HomeIcon } from "../svg/HomeIcon";
import { LogOutIcon } from "../svg/LogoutIcon";
import { UserIcon } from "../svg/UserIcon";
import "./menu.scss";
import { useAtom } from "jotai";
import { activeMenuAtom } from "@/lib/jotai";
import { useRouter } from "next/navigation";
import useOnReloadActiveMenuSet from "@/hooks/useOnReloadActiveMenuSet";

// menu items object
const MENU_ITEMS: { icon: JSX.Element; text: string }[] = [
  {
    icon: <HomeIcon />,
    text: "Home",
  },
  {
    icon: <CalendarIcon />,
    text: "Timetables",
  },
  {
    icon: <UserIcon />,
    text: "Profile",
  },
  {
    icon: <BarChartIcon />,
    text: "Statistics",
  },
  {
    icon: <LogOutIcon />,
    text: "logout",
  },
];

export default function Menu() {
  const router = useRouter();
  // active menu element from jotai store
  const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);

  useOnReloadActiveMenuSet();

  // tab navigation for menu
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    switch (e.key) {
      case "Enter":
      case " ":
        handleClick(index);
        break;
      case "ArrowUp":
        handleClick(activeMenu > 0 ? activeMenu - 1 : MENU_ITEMS.length - 1);
        break;
      case "ArrowDown":
        handleClick(activeMenu < MENU_ITEMS.length - 1 ? activeMenu + 1 : 0);
        break;
      default:
        break;
    }
  };

  const handleClick = (menuItemIndex: number) => {
    switch (menuItemIndex) {
      case 0:
        router.push("/home");
        break;
      case 1:
        router.push("/timetables");
        break;
      case 2:
        router.push("/profile");
        break;
      case 3:
        router.push("/statistics");
        break;
      case 4:
        router.push("/logout");
        break;
      default:
        router.push("/home");
        break;
    }
    setActiveMenu(menuItemIndex);
  };

  return (
    <section className="menu">
      <div className="menu__header menu--item">
        <CalendarIcon /> Appointment Admin
      </div>
      <nav className="menu__nav">
        {MENU_ITEMS.map((item, index) => (
          <div
            key={item.text}
            tabIndex={index + 1}
            className={
              activeMenu === index
                ? "menu__nav--item menu--item menu__nav--active"
                : "menu__nav--item menu--item"
            }
            onClick={() => handleClick(index)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
              handleKeyDown(e, index)
            }
          >
            {item.icon} {item.text}
          </div>
        ))}
      </nav>
    </section>
  );
}
