import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const title = css`
    display: flex;
    justify-content: center;
    width: 500px;
    background-color: #dbdbdb;
`;

export const mainBox = css`
    margin-top: 200px;
    display: flex;
    flex-direction: column;
`;

export const inputBox = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    :nth-last-of-type(1) {
        margin-bottom: 0;
    }
    & > input {
        margin-left: 10px;
        padding-left: 10px;
    }
    & > textarea {
        width: 200px;
    }
`;

export const buttonBox = css`
    margin-top: 100px;
    & button {
        padding: 5px 10px;
        margin-right: 10px;
        :nth-last-of-type(1) {
            margin-right: 0;
        }
        background-color: transparent;
        border: 1px solid #dbdbdb;
        &:hover {
            background-color: #dbdbdb
        }
        &:active {
            background-color: #bdbdbd
        }
    }
`;