/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";

function Search({ onSearch }) {
    const [searchType, setSearchType] = useState("title");
    const [searchDto, setSearchDto] = useState({
        title: "",
        author: ""
    })

    // 검색어를 입력할 때마다 searchDto를 업데이트
    const handleOnChange = (e) => {
        const value = e.target.value;

        // searchType에 따라 searchDto의 title 또는 author 값 변경
        setSearchDto((dto) => {
            return {
                ...dto,
                [searchType]: value, // 'title' 또는 'author' 필드를 업데이트
            };
        });
    };

    // 검색 버튼 클릭 시 실행되는 함수
    const handleSearch = () => {
        if (!(searchDto.title.trim() || searchDto.author.trim())) {
            alert("검색어를 입력해주세요.");
            return;
        }
        onSearch(searchDto);
    };

    // 검색 취소 시 초기화
    const handleCancelSearch = () => {
        setSearchDto({ title: "", author: "" }); // searchDto 초기화
    };

    // searchType이 변경될 때 searchDto의 값을 초기화
    useEffect(() => {
        setSearchDto({ title: "", author: "" });
    }, [searchType]);
    
    return (
        <div css={s.searchBox}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="title">제목</option>
            <option value="author">저자</option>
        </select>
        <input
            type="text"
            value={searchType === "title" ? searchDto.title : searchDto.author} // 현재 선택된 searchType에 맞는 값을 표시
            onChange={handleOnChange} // 입력값을 처리하는 함수 연결
            placeholder="검색어를 입력하세요"
        />
            <button onClick={handleSearch}>검색</button>
            <button onClick={handleCancelSearch}>검색 취소</button>
    </div>
    );
}

export default Search;