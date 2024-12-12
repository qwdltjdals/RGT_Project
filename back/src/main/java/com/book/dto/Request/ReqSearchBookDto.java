package com.book.dto.Request;

import com.book.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqSearchBookDto {
    private String title;
    private String author;
    private int limit;
    private int page;

    public Book toEntity() {
        return Book.builder()
                .title(title != null ? title : "") // title이 null이면 빈 문자열로 처리
                .author(author != null ? author : "") // author가 null이면 빈 문자열로 처리
                .build();
    }
}
