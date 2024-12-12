package com.book.dto.Request;

import com.book.entity.Book;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqAddBookDto {
    private String title;
    private String author;
    private String publisher;
    private int price;
    private String img;


    public Book toEntity() {
        return Book.builder()
                .title(title)
                .author(author)
                .publisher(publisher)
                .price(price)
                .img(img)
                .build();
    }
}
