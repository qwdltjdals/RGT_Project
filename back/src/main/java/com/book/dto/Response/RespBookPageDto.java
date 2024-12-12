package com.book.dto.Response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RespBookPageDto<T> {
    private List<T> books;
    private int totalCount;
    private int pageCount;
    private int pageSize;
}
