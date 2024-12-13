import React, { useState } from "react";
import ReactModal from "react-modal";
/** @jsxImportSource @emotion/react */
import * as s from "../addBook/style";
import { useMutation, useQuery } from "react-query";
import { instance } from "../../apis/util/instance";

function AddBookModal({ isOpen, onClose, refetch}) {
    const [book, setBook] = useState({
        title: "",
        author: "",
        publisher: "",
        price: 0,
        img: "https://media.istockphoto.com/id/949118068/ko/%EC%82%AC%EC%A7%84/%EB%8F%84%EC%84%9C%EB%8A%94.jpg?s=612x612&w=0&k=20&c=YDGPQQMQivmHg07-qdUiYgFF3cr3q4-7YTSkcVAS5m8="
    })

    const handleBookOnChange = (e) => {
        setBook((book) => ({
            ...book,
            [e.target.name] : e.target.value
        }));
    }

    const addBook = useMutation(
        ["addBook"],
        async () => {
            return await instance.post("/api/books", book)
        },
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess : () => {
                alert("등록 완료")
                setBook({
                    title: "",
                    author: "",
                    publisher: "",
                    price: 0,
                    img: "https://media.istockphoto.com/id/949118068/ko/%EC%82%AC%EC%A7%84/%EB%8F%84%EC%84%9C%EB%8A%94.jpg?s=612x612&w=0&k=20&c=YDGPQQMQivmHg07-qdUiYgFF3cr3q4-7YTSkcVAS5m8="
                })
                refetch();
            },
            onError : (response) => {
                alert(response.response.data)
            }
        }
    )

    const handleSubmitButtonOnClick = () => {
        addBook.mutate();
        onClose();
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 100,
                },
                content: {
                    position: "static",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "5px",
                    width: "700px",
                    height: "700px",
                    maxWidth: "90%",
                    overflow: "auto",
                    inset: "auto",
                },
            }}
        >
            <div css={s.layout}>
                <div css={s.title}>
                    <h2>도서 등록</h2>
                </div>
                <div css={s.mainBox}>
                    <div css={s.inputBox}>
                        <label>제목</label>
                        <input type="text" name="title" value={book.title} onChange={handleBookOnChange} placeholder="제목을 입력해 주세요."/>
                    </div>
                    <div css={s.inputBox}>
                        <label>저자</label>
                        <input type="text" name="author" value={book.author} onChange={handleBookOnChange} placeholder="저자를 입력해 주세요."/>
                    </div>
                    <div css={s.inputBox}>
                        <label>출판사</label>
                        <input type="text" name="publisher" value={book.publisher} onChange={handleBookOnChange} placeholder="출판사를 입력해 주세요."/>
                    </div>
                    <div css={s.inputBox}>
                        <label>가격</label>
                        <input type="text" name="price" value={book.price} onChange={handleBookOnChange} placeholder="가격을 입력해 주세요."/>
                    </div>
                </div>
                <div css={s.buttonBox}>
                    <button onClick={handleSubmitButtonOnClick}>등록</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </ReactModal>
    );
}

export default AddBookModal;
