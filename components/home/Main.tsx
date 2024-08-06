import React from "react";

import { QuickMenu } from "./rightContent/quickMenu";
import { OwnerIcon } from "./leftContent/restaurantIcon";
import { SwiperMenu } from "../swipers/SwiperMenu";
import { EventBanner } from "./leftContent/imageBanner/eventBanner";
import { LoginForm } from "./rightContent/loginForm";
import { Guide } from "./rightContent/guide";
import { OwnerGuide } from "./leftContent/ownerGuide";
import { InformEvent } from "./leftContent/Inform";
import { OwnerTip } from "./leftContent/ownerTip";
import { QnAform } from "./leftContent/qnaform";
import { OwnerSiteBanner } from "./leftContent/imageBanner/ownersite";
import { OwnerLink } from "./leftContent/ownerLink";
import ServiceCategory from "./leftContent/serviceCategory";

export const MainPage = () => {
    return (
        <>
            <div className="flex flex-col items-center pb-[120px]">
                <div className="w-full max-w-[1062px] px-4">
                    <SwiperMenu />
                    <div className="flex flex-col items-center gap-8 w-full lg:flex-row lg:items-start md:w-full">
                        <div className="flex flex-col grow lg:w-[calc(100%-352px)] md:w-full">
                            <OwnerIcon />
                            <EventBanner />
                            <OwnerGuide />
                            <InformEvent />
                            <OwnerTip />
                            <QnAform />
                            <OwnerSiteBanner />
                            <OwnerLink />
                            <ServiceCategory />
                        </div>
                        <div className=" lg:flex lg:flex-col lg:basis-[328px] hidden">
                            <LoginForm />
                            <QuickMenu />
                            <Guide />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
