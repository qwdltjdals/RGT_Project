package com.book.dto.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RespBookSearchDto {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private int price;
    private String img;
}
