package com.book.mapper;

import com.book.entity.Book;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {
    public int addBook(Book book);
    public int updateBook(Book book);
    public int deleteBook(int id);
    public List<Book> bookDetail(int id);
    List<Book> searchBooks(@Param("book") Book book, @Param("offset") int offset, @Param("limit") int limit);
    int countBooks(@Param("book") Book book);
    List<Book> booklist(@Param("offset") int offset, @Param("limit") int limit);
    boolean isBookDuplicate(@Param("title") String title);
}
