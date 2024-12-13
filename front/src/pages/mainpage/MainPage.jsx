/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../apis/util/instance";
import { useState } from "react";
import Search from "../../components/search/Search";

function MainPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchType, setSearchType] = useState("title");
    const [isSearching, setIsSearching] = useState(false);

    const { data: allBooks, isError, isLoading: isLoadingAll } = useQuery(
        ["getBookList", page, limit],
        async () => {
            return await instance.get("api/books", {
                params: { page, limit }
            });
        },
        {
            enabled: !isSearching,
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const searchBooks = useMutation(
        async ({ page, limit, searchDto }) => {
            const dto = {title: searchDto.title, author: searchDto.author, page, limit}
            console.log(dto)
            return await instance.post("api/books/search", dto);
        }
    );

    const handleSearch = (searchDto) => {
        setIsSearching(true);
        searchBooks.mutate(
            { searchDto, page, limit },
            {
                onSuccess: () => {
                    setIsSearching(false);
                }
            }
        );
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (isLoadingAll) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    if (isError) {
        return <div>데이터를 불러오는데 실패했습니다. 다시 시도해주세요.</div>;
    }

    return (
        <div css={s.layout}>
            <div css={s.contentBox}>
                <Search onSearch={handleSearch}/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>이미지</th>
                            <th>저자</th>
                            <th>출판사</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBooks?.data?.books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>
                                    <img
                                        src={book.img}
                                        alt={book.title}
                                        style={{ maxWidth: "100px", height: "auto" }}
                                    />
                                </td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 1}
                    >
                        이전
                    </button>
                    <span>{page}</span>
                    <button 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={allBooks && allBooks.data.books.length < limit}
                    >
                        다음
                    </button>
                </div>
                <div css={s.buttonBox}>
                    <button>도서 추가</button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;