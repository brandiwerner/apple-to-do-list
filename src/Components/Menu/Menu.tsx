import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    useDisclosure,
    DrawerHeader
} from '@chakra-ui/react';
import {
    GoCalendar,
    GoGrabber,
    GoListUnordered,
    GoTasklist
} from 'react-icons/go';
import { IconType } from 'react-icons';

import './Menu.scss';

interface MenuItem {
    icon: IconType;
    name: string;
    route: string;
};

const menuItems: MenuItem[] = [
    { name: 'All Tasks', icon: GoListUnordered, route: '/AllTasks' },
    { name: 'Calendar', icon: GoCalendar, route: '/Calendar' },
    { name: 'Completed Tasks', icon: GoTasklist, route: '/Completed' }
];

export const Menu = ():JSX.Element => {
    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonRef = React.useRef();

    const handleMenuItemClick = (route: string): void => {
        history.push(route);
        onClose();
    }
 
    const renderMenuOptions = (): JSX.Element => {
        return (
            <>
                {menuItems.map((row) => 
                    <a key={`menu-item-${row.name}`} className={`menu-item menu-item-${row.name}`} onClick={() => handleMenuItemClick(row.route)}>
                        <row.icon aria-hidden={true}/>
                        <p>{row.name}</p>
                    </a>
                )}
            </>
        )
    }

    return (
        <>
            <GoGrabber className="menu-button" aria-label="Menu" onClick={onOpen}/>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={buttonRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <div className="menu-content">
                            
                            {renderMenuOptions()}                            
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
      );
}