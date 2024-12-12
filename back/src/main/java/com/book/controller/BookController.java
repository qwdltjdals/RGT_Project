package com.book.controller;

import com.book.dto.Request.ReqAddBookDto;
import com.book.dto.Request.ReqBookUpdateDto;
import com.book.dto.Request.ReqBooklistDto;
import com.book.dto.Request.ReqSearchBookDto;
import com.book.dto.Response.RespBookPageDto;
import com.book.dto.Response.RespBookSearchDto;
import com.book.dto.Response.RespBooklistDto;
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

    // 책 목록 컨트롤러
    @GetMapping("")
    public ResponseEntity<?> loadBooks(@RequestBody ReqBooklistDto dto) {
        RespBookPageDto<RespBooklistDto> result = bookService.booklist(dto);
        return ResponseEntity.ok().body(result);
    }

    // 책 검색 컨트롤러
    @PostMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestBody ReqSearchBookDto dto) {
        RespBookPageDto<RespBookSearchDto> result = bookService.searchBooks(dto);
        return ResponseEntity.ok().body(result);
    }

    // 책 상세조회 컨트롤러
    @GetMapping("/{id}")
    public ResponseEntity<?> bookDetail(@PathVariable int id) {
        return ResponseEntity.ok().body(bookService.bookDetail(id));
    }

    // 책 수정 컨트롤러
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@RequestBody ReqBookUpdateDto dto) {
        return ResponseEntity.ok().body(bookService.updateBook(dto));
    }

    // 책 삭제 컨트롤러
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        return ResponseEntity.ok().body(bookService.deleteBook(id));
    }
}
