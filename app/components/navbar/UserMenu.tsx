"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItems from './MenuItems';
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import useLoginModal from "@/app/Hooks/userLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/Hooks/useRentModal";

interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        // on rent

        rentModal.onOpen();

    },[currentUser,loginModal,rentModal]);
    return (
        <div
            className="relative"
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden md:block text-sm font-semibold py-3 px-3 rounded-full hover:bg-neutral-200 transition cursor-pointer"
                >
                    {`${currentUser?.name} Your Home`}
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div>
                        <div className="w-10 h-14 bg-neutral-100 absolute right-3 top-12 rotate-45 rounded-md"></div>
                        <div
                            className="absolute rounded-xl shadow-md w-[45vw] md:w-3/4 bg-neutral-100 overflow-hidden -right-0 top-14 text-sm"
                        >
                            <div className="flex flex-col cursor-pointer">
                                {
                                    currentUser ? (

                                        <>
                                            <MenuItems onClick={() => { }}
                                                label={"My trips"} />

                                            <MenuItems onClick={() => { }}
                                                label={"My favorites"} />
                                            <MenuItems onClick={() => { }}
                                                label={"My reservations"} />
                                            <MenuItems onClick={() => { }}
                                                label={"My properties"} />
                                            <MenuItems onClick={rentModal.onOpen}
                                                label={"Kingbnb my home"} />
                                                <hr />
                                            <MenuItems onClick={() => signOut()}
                                                label={"Logout"} />
                                        </>
                                    ) :
                                        (
                                            <>
                                                <MenuItems onClick={loginModal.onOpen}
                                                    label={"Login"} />

                                                <MenuItems onClick={registerModal.onOpen}
                                                    label={"Sign Up"} />
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>

                )
            }
        </div >
    )
}

export default UserMenu