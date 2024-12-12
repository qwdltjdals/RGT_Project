package com.book.dto.Request;

import com.book.entity.Book;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqBooklistDto {
    private int limit;
    private int page;

    public Book toEntity() {
        return Book.builder()
                .build(); // 필요시 검색 필터 추가
    }
}
