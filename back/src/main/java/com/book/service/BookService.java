package com.book.service;

import com.book.dto.Request.ReqAddBookDto;
import com.book.dto.Request.ReqBookUpdateDto;
import com.book.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    // 책 추가 서비스
    public void addBook(ReqAddBookDto dto) {
        bookMapper.addBook(dto.toEntity());
    }

    //책 수정 서비스
    public int updateBook(ReqBookUpdateDto dto) {
        int successCount = bookMapper.updateBook(dto.toEntity());
        if( successCount == 0) {
            throw new RuntimeException("도서를 수정하는 중 오류가 발생했습니다.");
        }
        return successCount;
    }

    // 책 삭제 서비스
    public int deleteBook(int id) {
        int succeccCount = bookMapper.deleteBook(id);
        if(succeccCount == 0) {
            throw new RuntimeException("도서를 삭제하는 중 오류가 발생했습니다.");
        }
        return succeccCount;
    }
}
