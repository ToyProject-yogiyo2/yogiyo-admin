"use client";
import { getAxios } from "@/app/services/loginAPI";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { redirect } from "next/navigation";

const useAxiosAuth = () => {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = getAxios.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = getAxios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;

                if (error.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await refreshToken();
                    prevRequest.headers["Authorizetion"] = `Bearer ${session?.user.accessToken}`;
                    return getAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            getAxios.interceptors.request.eject(requestIntercept);
            getAxios.interceptors.response.eject(responseIntercept);
        };
    }, [session]);
    return getAxios;
};

export default useAxiosAuth;
