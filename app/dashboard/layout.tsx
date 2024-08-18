"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userStateAtom } from "../recoil/state";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useRecoilValue(userStateAtom);

    useEffect(() => {
        if (!user?.isLoggedIn) {
            router.push("/login");
        }
    }, [user, router]);

    return <div>{user?.isLoggedIn ? children : null}</div>;
}
