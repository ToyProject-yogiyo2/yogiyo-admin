import axios from "axios";

export const getAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        SameSite: "lax",
    },
    withCredentials: true,
});

let lastTimeAccessToken = Date.now();
const TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000;

setInterval(async () => {
    const now = Date.now();
    const diffTimeAccessToken = Math.floor((now - lastTimeAccessToken) / 1000 / 60);

    if (diffTimeAccessToken >= 10) {
        console.log("**** 10분 경과 토큰 갱신");
        try {
            const refreshRes = await getAxios.post("/re-issue");
            const timeStamp = new Date();
            console.log(timeStamp);
            console.log("**** refreshToken 갱신 완료");
        } catch (error) {
            console.error("****토큰 갱신 실패", error);
        }
    }
}, TOKEN_REFRESH_INTERVAL);

getAxios.interceptors.request.use(
    (config) => {
        const accessToken = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("accessToken="));

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken.split("=")[1]}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

getAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            console.error("네트워크 및 서버 응답 없음", error);
            return Promise.reject(error);
        }
        const { status } = error.response;

        if (status === 401 || status === 403) {
            const refreshToken = error.response.headers["refresh-token"];
            console.log("token만료됨");

            if (refreshToken) {
                try {
                    const refreshResponse = await getAxios.post("/re-issue");
                    console.log("axios response use 안쪽", refreshResponse.data);
                    document.cookie = `accessToken=${refreshResponse.data.accessToken}`;
                    lastTimeAccessToken = Date.now();
                    error.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
                    console.log("refreshToken 작동");
                    return getAxios(error.config);
                } catch (refreshError) {
                    console.error("토큰 갱신 실패함", refreshError);
                }
            } else {
                console.log("**예상안되있는 에러");
            }
        }
        return Promise.reject(error);
    }
);

export const LogoutBtn = async (userId: number) => {
    const resLogout = await getAxios
        .post(`/owner/logout/${userId}`, {})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const emailJoin = async (email: string, password: string, nickname: string) => {
    const userData = {
        email,
        password,
        nickname,
        providerType: "DEFAULT",
    };
    console.log(userData);
    try {
        const resJoin = await getAxios.post("/owner/join", userData);
        return resJoin.data;
    } catch (error) {
        console.log(error);
    }
};

export const emailLogin = async (email: string, password: string) => {
    const userData = {
        email,
        password,
        authCode: null,
        providerType: "DEFAULT",
    };

    console.log(userData);

    const resSubmit = await getAxios.post("/owner/login", userData, {});
    if (resSubmit.status >= 200 && resSubmit.status < 300) {
        const { userId, email: userEmail } = resSubmit.data;
        console.log(`${resSubmit.data.userId} 로그인 성공`);
        console.log(resSubmit);

        const resMyPage = await getAxios.get("/owner/mypage");
        const { nickname: userNickname } = resMyPage.data;
        return { userId, userEmail, userNickname };
    } else {
        console.log("Login api error");
        return null;
    }
};

export const SocialKakao = async () => {
    const CLIENT_ID = `${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}`;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};

export const SocialNaver = async () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI;
    const STATE = "jjak";
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
};
