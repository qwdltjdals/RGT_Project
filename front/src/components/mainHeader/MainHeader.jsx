import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from './style';


function MainHeader(props) {
    return (
        <div css={s.layout}>
            <div css={s.mainBox}>
                <h1>도서 관리</h1>
            </div>
        </div>
    );
}

export default MainHeader;