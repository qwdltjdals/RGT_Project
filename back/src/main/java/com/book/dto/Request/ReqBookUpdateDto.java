package com.book.dto.Request;

import com.book.entity.Book;
import lombok.Data;

@Data
public class ReqBookUpdateDto {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private int price;
    private String img;
    private String text;

    public Book toEntity() {
        return Book.builder()
                .id(id)
                .title(title)
                .author(author)
                .publisher(publisher)
                .price(price)
                .img(img)
                .text(text)
                .build();
    }
}
