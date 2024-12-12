package com.book.controller;

import com.book.dto.ReqAddBookDto;
import com.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    // 책 추가 컨트롤러
    @PostMapping("")
    public ResponseEntity<?> addBook(@RequestBody ReqAddBookDto dto) {
        bookService.addBook(dto);
        return ResponseEntity.ok().body(true);
    }

    // 책 검색 컨트롤러
    @GetMapping("")
    public ResponseEntity<?> searchBook() {
        return ResponseEntity.ok().body(null);
    }

    // 책 상세조회 컨트롤러
    @GetMapping("id")
    public ResponseEntity<?> bookDetail() {
        return ResponseEntity.ok().body(null);
    }

    // 책 수정 컨트롤러
    @PutMapping("id")
    public ResponseEntity<?> updateBook() {
        return ResponseEntity.ok().body(true);
    }

    // 책 삭제 컨트롤러
    @DeleteMapping("id")
    public ResponseEntity<?> deleteBook() {
        return ResponseEntity.ok().body(true);
    }
}
