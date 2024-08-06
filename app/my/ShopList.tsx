import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { shoplistState } from "../recoil/state";
import { ShopList as fetchShopList } from "../services/shopAPI";

const ShopList = () => {
    const [shops, setShops] = useRecoilState(shoplistState);

    useEffect(() => {
        const loadShops = async () => {
            try {
                const shopData = await fetchShopList();
                setShops(shopData || []); // Ensure setting an array even if shopData is null
            } catch (error) {
                console.error("Failed to fetch shops:", error);
                setShops([]); //에러일 경우 빈 배열
            }
        };

        if (!shops) {
            loadShops();
        }
    }, [setShops]);

    return (
        <div>
            <h1>가게 목록</h1>
            <ul>
                {shops &&
                    shops.map((shop) => (
                        <li key={shop.id}>
                            <img
                                src={shop.icon}
                                alt={shop.name}
                                style={{ width: 50, height: 50 }}
                            />
                            <h2>{shop.name}</h2>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ShopList;
