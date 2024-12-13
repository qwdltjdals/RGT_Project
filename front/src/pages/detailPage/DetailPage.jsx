import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../apis/util/instance';
import { FaHome } from "react-icons/fa";
/** @jsxImportSource @emotion/react */
import * as s from './style';

function DetailPage(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const bookDetail = useQuery(
        ["bookDetail", id],
        async () => {
            return await instance.get(`/api/books/${id}`)
        },
        {
            onError: (e) => {
                console.error(e)
                alert("데이터를 불러오는 중 오류가 발생했습니다.")
            }
        }
    )
    console.log(bookDetail)

    const homeButtonOnClick = () => {
        navigate("/")
    }

    if (!bookDetail) {
        return <div>책 정보를 불러오는 중...</div>;
    }

    return (
        <div css={s.layout}>
            <div css={s.bookDetails}>
                <div css={s.imageContainer}>
                    <img src={bookDetail?.data?.data.img} alt={bookDetail?.data?.data.title} css={s.bookImage} />
                </div>
                <div css={s.textContainer}>
                    <h1 css={s.bookTitle}>{bookDetail?.data?.data.title}</h1>
                    <h3 css={s.bookAuthor}>{bookDetail?.data?.data.author}</h3>
                    <p css={s.bookPublisher}>출판사: {bookDetail?.data?.data.publisher}</p>
                    <p css={s.bookPrice}>{bookDetail?.data?.data.price.toLocaleString()} 원</p>
                        <div css={s.bookDescription}>
                            <h4>도서 설명</h4>
                            <p>{bookDetail?.data?.data.text}</p>
                        </div>
                    </div>
                <button css={s.homeButton} onClick={homeButtonOnClick}>
                    <FaHome />
                </button>
            </div>
        </div>
    );
}

export default DetailPage;