import { useHistory } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
} from "@chakra-ui/react";
import { GoGrabber } from "react-icons/go";

import "./Menu.scss";

interface MenuItem {
  name: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { name: "All Tasks", route: "/AllTasks" },
  { name: "Calendar", route: "/Calendar" },
  { name: "Completed Tasks", route: "/Completed" },
];

export const Menu = (): JSX.Element => {
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMenuItemClick = (route: string): void => {
    history.push(route);
    onClose();
  };

  const renderMenuOptions = (): JSX.Element => {
    return (
      <>
        {menuItems.map((row) => (
          <a
            key={`menu-item-${row.name}`}
            className={`menu-item menu-item-${row.name}`}
            onClick={() => handleMenuItemClick(row.route)}
          >
            <p>{row.name}</p>
          </a>
        ))}
      </>
    );
  };

  return (
    <>
      <GoGrabber className="menu-button" aria-label="Menu" onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <div className="menu-content">{renderMenuOptions()}</div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
