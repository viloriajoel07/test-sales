import {
  IconHome,
  IconBoxSeam,
  IconReportMoney,
  IconLogout,
} from "@tabler/icons-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export const PORT = process.env.PORT || 3000;

export const headerLinks = [
  {
    label: "Content 1",
    url: "#content1",
  },
  {
    label: "Content 2",
    url: "#content2",
  },
  {
    label: "Login",
    url: "/auth",
  },
];

export const menuOptions = [
  {
    id: 2,
    title: "Sales",
    icon: <IconBoxSeam />,
    link: "/auth",
  },
  {
    id: 3,
    title: "New Sale",
    icon: <IconReportMoney />,
    link: "/auth/sales/new",
  },
];
