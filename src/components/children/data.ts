import type { MenuItemType } from '../../types';

const menu: MenuItemType[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Products",
    children: [
      {
        id: 21,
        label: "Electronics",
        children: [
          { id: 211, label: "Laptops", href: "/products/electronics/laptops" },
          { id: 212, label: "Phones", href: "/products/electronics/phones" },
        ],
      },
      {
        id: 22,
        label: "Clothing",
        href: "/products/clothing",
      },
    ],
  },
  {
    id: 3,
    label: "About",
    children: [
      { id: 31, label: "Our Team", href: "/about/team" },
      { id: 32, label: "Company Info", href: "/about/info" },
    ],
  },
];

export default menu;