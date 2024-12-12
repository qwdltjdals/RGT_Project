package com.book.service;

import com.book.dto.Request.ReqAddBookDto;
import com.book.dto.Request.ReqBookUpdateDto;
import com.book.dto.Request.ReqBooklistDto;
import com.book.dto.Request.ReqSearchBookDto;
import com.book.dto.Response.RespBookDetailDto;
import com.book.dto.Response.RespBookPageDto;
import com.book.dto.Response.RespBookSearchDto;
import com.book.dto.Response.RespBooklistDto;
import com.book.entity.Book;
import com.book.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookMapper bookMapper;

    // 책 추가 서비스
    public void addBook(ReqAddBookDto dto) {
        // 중복 체크 로직
        boolean isDuplicate = bookMapper.isBookDuplicate(dto.getTitle());
        if (isDuplicate) {
            throw new RuntimeException("이미 존재하는 책입니다: " + dto.getTitle());
        }
        bookMapper.addBook(dto.toEntity());
    }

    // 책 목록 조회 서비스
    public RespBookPageDto<RespBooklistDto> booklist(ReqBooklistDto dto) {

        int offset = (dto.getPage() - 1) * dto.getLimit();

        List<Book> books = bookMapper.booklist(offset, dto.getLimit());

        int totalCount = bookMapper.countBooks(dto.toEntity());

        List<RespBooklistDto> booklist = books.stream()
                .map(book -> RespBooklistDto.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .price(book.getPrice())
                        .publisher(book.getPublisher())
                        .img(book.getImg())
                        .build())
                .collect(Collectors.toList());

        int pageCount = (int) Math.ceil((double) totalCount / (double) dto.getLimit());


        return RespBookPageDto.<RespBooklistDto>builder()
                .books(booklist)
                .totalCount(totalCount)
                .pageCount(pageCount)
                .pageSize(dto.getLimit())
                .build();
    }

    // 책 검색 서비스
    public RespBookPageDto<RespBookSearchDto> searchBooks(ReqSearchBookDto dto) {

        int offset = (dto.getPage() - 1) * dto.getLimit();

        List<Book> books = bookMapper.searchBooks(dto.toEntity(), offset, dto.getLimit());

        int totalCount = bookMapper.countBooks(dto.toEntity());

        List<RespBookSearchDto> searchBooks = books.stream()
                .map(book -> RespBookSearchDto.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .price(book.getPrice())
                        .publisher(book.getPublisher())
                        .img(book.getImg())
                        .build())
                .collect(Collectors.toList());

        int pageCount = (int) Math.ceil((double) totalCount / (double) dto.getLimit());

        return RespBookPageDto.<RespBookSearchDto>builder()
                .books(searchBooks)
                .totalCount(totalCount)
                .pageCount(pageCount)
                .pageSize(dto.getLimit())
                .build();
    }

    // 책 상세조회 서비스
    public RespBookDetailDto bookDetail(int id) {
        List<Book> books = bookMapper.bookDetail(id);
        Book book = books.get(0);

        return RespBookDetailDto.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .price(book.getPrice())
                .img(book.getImg())
                .build();
    }

    // 책 수정 서비스
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
