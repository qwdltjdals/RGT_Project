import { css } from "@emotion/react";

export const searchBox = css`
    display: flex;
    margin-bottom: 20px;
    gap: 10px;

    select {
        border: 1px solid #dbdbdb;
    }

    input {
        width: 400px;
        padding: 5px;
        border: 1px solid #dbdbdb;
    }

    button {
        padding: 5px 10px;
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