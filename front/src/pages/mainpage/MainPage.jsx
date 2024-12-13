/** @jsxImportSource @emotion/react */
import { useMutation, useQuery } from "react-query";
import * as s from "./style";
import { instance } from "../../apis/util/instance";
import { useState } from "react";
import Search from "../../components/search/Search";
import AddBook from "../../components/addBook/AddBook";
import EditBookModal from "../../modal/editBook/EditBookModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

function MainPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchType, setSearchType] = useState("title");
    const [isSearching, setIsSearching] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const navigate = useNavigate();

    const [bookIdToEdit, setBookIdToEdit] = useState(null); // 선택된 book의 id 저장

    const handleEditButtonClick = (bookId) => {
        setBookIdToEdit(bookId); // 수정할 book의 id를 상태에 저장
        setOpenEditModal(true); // 모달을 열기
    };

    const closeModal = () => {
        setOpenEditModal(false); // 모달 닫기
    };

    const handleImageClick = (bookId) => {
        navigate(`/detailPage/${bookId}`); // 상세 페이지로 이동
    };

    // 전체조회하는 쿼리
    const { data: allBooks, isError, isLoading: isLoadingAll, refetch } = useQuery(
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
    
    // 검색하는 쿼리
    const searchBooks = useMutation(
        async ({ page, limit, searchDto }) => {
            const params = {
                title: searchDto.title || "",
                author: searchDto.author || "",
                page,
                limit
            };
            console.log(params);
            return await instance.get("/api/books/search", { params });
        },
        {
            onSuccess: (data) => {
                console.log(data)
                // 검색이 성공하면 `queryClient`를 사용하여 전체 책 리스트를 업데이트
                QueryClient.setQueryData([allBooks, page, limit], data.data);
            },
        }
    );

    // 검색 핸들러
    const handleSearch = (searchDto) => {
        setIsSearching(true);
        searchBooks.mutate(
            { searchDto, page, limit }
        );
    };

    // 삭제 쿼리
    const deleteBook = useMutation(
        async (id) => {
            return await instance.delete(`api/books/${id}`)
        },
        {
            onSuccess: () => {
                refetch();
            },
            onError: (error) => {
                console.error("삭제 실패:", error);
                alert("삭제에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    )

    // 삭제 핸들러
    const handleDeleteOnClick = (id) => {
        if(window.confirm("삭제하시겠습니까?")) {
            deleteBook.mutate(id);
        }
    }

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
            <div css={s.searchBox}>
                <Search onSearch={handleSearch}/>
            </div>
            <AddBook refetch={refetch}/>
            {
                !!allBooks?.data?.books.length
                ?
                <div css={s.contentBox}>
                <table css={s.mainTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>이미지</th>
                            <th>저자</th>
                            <th>출판사</th>
                            <th>금액</th>
                            <th>수정</th>
                            <th>삭제</th>
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
                                        style={{ width: "100px", height: "100px" }}
                                        onClick={() => handleImageClick(book.id)}
                                    />
                                </td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.price.toLocaleString()}</td>
                                <td><button onClick={() => handleEditButtonClick(book.id)}>수정</button>
                                {openEditModal && bookIdToEdit === book.id && (
                                    <EditBookModal
                                        isOpen={openEditModal}
                                        onClose={closeModal}
                                        refetch={refetch}
                                        id={book.id}
                                    />
                                )}</td>
                                
                                <td><button onClick={() => handleDeleteOnClick(book.id)}>삭제</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div css={s.page}>
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
            </div>
            :
            <>
            <div css={s.defaultPage}>
                <div css={s.defaultMessage}>
                    <h1>도서가 없거나, 마지막 페이지 입니다.</h1>
                </div>
                    <div css={s.page}>
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
                </div>
            </>
            }
        </div>
    );
}

export default MainPage;