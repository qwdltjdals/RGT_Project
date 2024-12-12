package com.book.service;

import com.book.dto.ReqAddBookDto;
import com.book.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    public void addBook(ReqAddBookDto dto) {
        bookMapper.addBook(dto.toEntity());
    }
}
