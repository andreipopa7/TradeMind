import { AiFillHome, AiOutlineAppstore } from "react-icons/ai";
import {FaCog, FaCalendarAlt, FaEnvelopeOpenText, FaCalendarDay} from "react-icons/fa";
import { IoPeople, IoHelpCircle, IoChevronDown } from "react-icons/io5";
import {BsGraphUp, BsGraphUpArrow, BsListCheck} from "react-icons/bs";

export type SidebarItem = {
    title: string;
    path: string;
    icon: React.ReactNode;
    cName?: string;
    subMenu?: SidebarItem[];
    arrow?: React.ReactNode;
};

export const SideMenuData: SidebarItem[] = [
    {
        title: "Home",
        path: "/home",
        icon: <AiFillHome />,
        cName: "side-menu-text",
    },
    {
        title: "**Accounts",
        path: "#",
        icon: <IoPeople />,
        cName: "side-menu-text",
        subMenu: [
            {
                title: "Add New Account",
                path: "/accounts/add",
                icon: <AiOutlineAppstore />,
            },
            {
                title: "Your Accounts",
                path: "/accounts/dashboard",
                icon: <BsListCheck />,
            },
        ],
        arrow: <IoChevronDown />,
    },
    {
        title: "Backtesting",
        path: "#",
        icon: <BsGraphUp />,
        cName: "side-menu-text",
        subMenu: [
            {
                title: "New Backtesting Session",
                path: "/backtesting/new-session",
                icon: <AiOutlineAppstore />,
            },
            {
                title: "View History of Your Backtestings",
                path: "/backtesting/history",
                icon: <FaCalendarAlt />,
            },
            {
                title: "Custom Your Personal Strategy",
                path: "/backtesting/custom-strategy",
                icon: <FaCog />,
            },
        ],
        arrow: <IoChevronDown />,
    },
    {
        title: "Statistics",
        path: "#",
        icon: <BsGraphUpArrow />,
        cName: "side-menu-text",
        subMenu: [
            {
                title: "Create New Statistic",
                path: "/statistics/new",
                icon: <AiOutlineAppstore />,
            },
            {
                title: "Your Statistics",
                path: "/statistics/view",
                icon: <BsListCheck />,
            },
        ],
        arrow: <IoChevronDown />,
    },
    {
        title: "**Economic Calendar",
        path: "/economic-calendar",
        icon: <FaCalendarAlt />,
        cName: "side-menu-text",
    },
    {
        title: "Personal Calendar",
        path: "/personal-calendar",
        icon: <FaCalendarDay />,
        cName: "side-menu-text",
    },
    {
        title: "Inbox",
        path: "/inbox",
        icon: <FaEnvelopeOpenText />,
        cName: "side-menu-text",
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <FaCog />,
        cName: "side-menu-text",
    },
    {
        title: "Help",
        path: "/help",
        icon: <IoHelpCircle />,
        cName: "side-menu-text",
    },
];
