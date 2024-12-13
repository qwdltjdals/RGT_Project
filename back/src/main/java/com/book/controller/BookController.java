package com.book.controller;

import com.book.dto.Request.ReqAddBookDto;
import com.book.dto.Request.ReqBookUpdateDto;
import com.book.dto.Request.ReqBooklistDto;
import com.book.dto.Request.ReqSearchBookDto;
import com.book.dto.Response.RespBookPageDto;
import com.book.dto.Response.RespBookSearchDto;
import com.book.dto.Response.RespBooklistDto;
import com.book.exception.BookException;
import com.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        try {
            bookService.addBook(dto);
            return ResponseEntity.ok().body(true);
        } catch (BookException e) {
            return handleBookException(e);
        }
    }

    // 책 목록 컨트롤러
    @GetMapping("")
    public ResponseEntity<?> loadBooks(@RequestParam int page, @RequestParam int limit) {
        RespBookPageDto<RespBooklistDto> result = bookService.booklist(page, limit);
        return ResponseEntity.ok().body(result);
    }

    // 책 검색 컨트롤러
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam(required = false) String title, @RequestParam(required = false) String author, @RequestParam int page, @RequestParam int limit) {
        System.out.println("aaa");
        ReqSearchBookDto dto = ReqSearchBookDto.builder()
                .title(title)
                .author(author)
                .page(page)
                .limit(limit)
                .build();
        System.out.println(dto);
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
        try {
            return ResponseEntity.ok().body(bookService.updateBook(dto));
        } catch (BookException e) {
            return handleBookException(e);
        }
    }

    // 책 삭제 컨트롤러
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        try {
            return ResponseEntity.ok().body(bookService.deleteBook(id));
        } catch (BookException e) {
            return handleBookException(e);
        }
    }

    // BookException을 처리
    private ResponseEntity<?> handleBookException(BookException e) {
        // BookException이 발생하면 400 BAD REQUEST 상태 코드와 메시지를 응답으로 보냄
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
