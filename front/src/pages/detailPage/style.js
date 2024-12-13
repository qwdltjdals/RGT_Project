/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const bookDetails = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`;

export const imageContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const bookImage = css`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

export const textContainer = css`
  width: 100%;
  text-align: center;
`;

export const bookTitle = css`
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
`;

export const bookAuthor = css`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #777;
`;

export const bookPublisher = css`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #999;
`;

export const bookPrice = css`
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #333;
`;

export const bookDescription = css`
  text-align: left;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
`;

export const homeButton = css`
  border: none;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  & svg {
    color: black;
    width: 30px;
    height: 30px;
    &:hover {
        color: #bdbdbd;
    }
  }
`;