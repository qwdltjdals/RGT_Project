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
    private int page;
    private int limit;

    public Book toEntity() {
        return Book.builder()
                .title(title)
                .author(author)
                .build();
    }
}
