package com.book.mapper;

import com.book.entity.Book;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {
    public int addBook(Book book);
    public int updateBook(Book book);
    public int deleteBook(int id);
}
