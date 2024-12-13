/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import * as s from './style';
import AddBookModal from '../../modal/addBook/AddBookModal';

function AddBook({refetch}) {
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    const closeModal = () => {
        setOpenRegisterModal(false); // 모달 닫기
    };
    return (
        <div css={s.buttonBox}>
            <button onClick={() => setOpenRegisterModal(true)}>도서 추가</button>
            <AddBookModal isOpen={openRegisterModal} onClose={closeModal} refetch={refetch}/>
        </div>
    );
}

export default AddBook;