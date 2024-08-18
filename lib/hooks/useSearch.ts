import { useMemo, useState } from "react";

const useSearch = <T extends { name: string }>(initalList: T[]) => {
    const [search, setSearch] = useState("");

    // 검색할 데이터 이름과 매칭
    const getFilteredData = useMemo(() => {
        if (search === "") {
            return initalList;
        }
        return initalList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, initalList]);

    // 검색어 입력 이벤트 핸들러
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return { search, onChangeSearch, getFilteredData };
};

export default useSearch;
