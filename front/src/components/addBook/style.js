import { css } from "@emotion/react";

export const buttonBox = css`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    & > button {
        background-color: transparent;
        border: 1px solid #dbdbdb;
        width: 100px;
        height: 40px;
        &:hover {
            background-color: #dbdbdb
        }
        &:active {
            background-color: #bdbdbd
        }
    }
`;