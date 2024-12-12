package com.book.dto.Response;

import com.book.entity.Book;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RespBookDetailDto {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private int price;
    private String img;
}
