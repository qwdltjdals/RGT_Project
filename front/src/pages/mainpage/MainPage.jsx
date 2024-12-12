/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../apis/util/instance";
import { useState } from "react";

function MainPage(props) {

        // 페이지와 페이지 당 항목 수 상태 관리
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(10); // 한 페이지당 10개 항목

    const { data, isError, isLoading, refetch } = useQuery(
        ["getBookList", page, limit],
        async () => {
            return await instance.get("api/books", {
                params : {page, limit}
            });
        },
        {
            onSuccess : (response) => {
                console.log(response)
            },
            retry : 0,
            refetchOnWindowFocus: false
        }
    );

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <div css={s.layout}>
                <div css={s.searchBox}>
                    검색 기능 추가
                </div>
                <div css={s.contentBox}>
                    <table>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>제목</td>
                                <td>이미지</td>
                                <td>저자</td>
                                <td>출판사</td>
                                <td>금액</td>
                            </tr>
                        </thead>
                        <tbody>
                        {data?.data?.books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td><img src={book.image} alt={book.title} /></td>
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
                                    disabled={data && data.data.length < limit}
                                >
                                    다음
                                </button>
                            </div>
                        <div css={s.buttonBox}>
                                <button>도서 추가</button>
                            </div>
                    </div>
            </div>
        </>
    );
}

export default MainPage;