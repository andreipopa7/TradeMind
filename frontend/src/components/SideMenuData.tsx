import { AiFillHome, AiOutlineAppstore } from "react-icons/ai";
import { FaCog, FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { IoPeople, IoHelpCircle, IoChevronDown  } from "react-icons/io5";


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
        title: "Account Dashboard",
        path: "#",
        icon: <FaCog />,
        cName: "side-menu-text",
        subMenu: [
            {
                title: "Overview",
                path: "/dashboard/overview",
                icon: <AiOutlineAppstore />,
            },
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <FaCog />,
            },
        ],
        arrow: <IoChevronDown />,
    },
    {
        title: "Backtesting",
        path: "#",
        icon: <FaCog />,
        cName: "side-menu-text",
        subMenu: [
            {
                title: "New Backtesting Session",
                path: "/dashboard/overview",
                icon: <AiOutlineAppstore />,
            },
            {
                title: "View Your Backtesting Sessions",
                path: "/dashboard/settings",
                icon: <FaCog />,
            },
        ],
        arrow: <IoChevronDown />,
    },
    {
        title: "Products",
        path: "/edit-credentials",
        icon: <FaCartPlus />,
        cName: "side-menu-text",
    },
    {
        title: "News",
        path: "/news",
        icon: <IoPeople />,
        cName: "side-menu-text",
    },
    {
        title: "Inbox",
        path: "/edit-credentials",
        icon: <FaEnvelopeOpenText />,
        cName: "side-menu-text",
    },
    {
        title: "Support",
        path: "/edit-credentials",
        icon: <IoHelpCircle />,
        cName: "side-menu-text",
    },
];
