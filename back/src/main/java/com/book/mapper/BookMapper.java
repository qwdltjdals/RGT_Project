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
    List<Book> searchByTitle(@Param("title") String title, @Param("offset") int offset, @Param("limit") int limit);
    int countByTitle(@Param("title") String title);
    List<Book> searchByAuthor(@Param("author") String author, @Param("offset") int offset, @Param("limit") int limit);
    int countByAuthor(@Param("author") String author);
    int countBooks(@Param("book") Book book);
    List<Book> booklist(@Param("offset") int offset, @Param("limit") int limit);
    boolean isBookDuplicateCteate(@Param("title") String title);
    boolean isBookDuplcateEdit(@Param("title") String title, @Param("id") int id);
}
