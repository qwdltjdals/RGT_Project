# 도서 관리 서비스 입니다.

사용 프로그램

Visual Studio Code, InteliJ

사용 언어

JAVA, JavaScript, CSS, React, SpringBoot, HTML

자바 버전은 11버전 입니다.

## 주요 기능 설명

1. 도서 목록 전체 조회 기능
2. 도서 목록 검색 기능(개발 중)
3. 도서 추가 기능
4. 도서 수정 기능
5. 도서 삭제 기능
6. 도서 상세보기 기능
7. 페이지네이션 기능
8. 백엔드(배포가 시간이 걸려 깃허브 링크로 대체합니다)



처음 사이트를 들어가면 전체 책이 조회가 됩니다.

그 후에 검색을 통하여 제목, 저자로 책을 검색할 수 있습니다.

책의 정보가 잘못 입력되어 있는 경우, 수정 가능하며, 책 이름에 대한 중복체크도 가능합니다.

책의 추가, 수정은 리엑트 모달로 띄웠습니다.

책을 삭제할 수도 있습니다.

책 상세보기 기능도 지원하고 있습니다.



### 주요코드

```javascript
    // 전체조회하는 쿼리
    const { data: allBooks, isError, isLoading: isLoadingAll, refetch } = useQuery(
        ["getBookList", page, limit],
        async () => {
            return await instance.get("api/books", {
                params: { page, limit }
            });
        },
        {
            enabled: !isSearching,
            retry: 0,
            refetchOnWindowFocus: false
        }
    );
```



```javascript
    // 삭제 쿼리
    const deleteBook = useMutation(
        async (id) => {
            return await instance.delete(`api/books/${id}`)
        },
        {
            onSuccess: () => {
                refetch();
            },
            onError: (error) => {
                console.error("삭제 실패:", error);
                alert("삭제에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    )
```



```java
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
```



```java
    // 책 삭제 컨트롤러
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        try {
            return ResponseEntity.ok().body(bookService.deleteBook(id));
        } catch (BookException e) {
            return handleBookException(e);
        }
    }
```



```java
    // BookException을 처리
    private ResponseEntity<?> handleBookException(BookException e) {
        // BookException이 발생하면 400 BAD REQUEST 상태 코드와 메시지를 응답으로 보냄
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
```



```java
    // 책 목록 조회 서비스
    public RespBookPageDto<RespBooklistDto> booklist(int page, int limit) {

        int offset = (page - 1) * limit;

        List<Book> books = bookMapper.booklist(offset, limit);
        Book searchBook = Book.builder().build();

        int totalCount = bookMapper.countBooks(searchBook);
        System.out.println(page);

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
        System.out.println(booklist);
        System.out.println("Total count: " + totalCount);  // 총 책의 수 출력
        System.out.println("Book list: " + booklist);     // 책 목록 출력

        int pageCount = (int) Math.ceil((double) totalCount / (double) limit);


        return RespBookPageDto.<RespBooklistDto>builder()
                .books(booklist)
                .totalCount(totalCount)
                .pageCount(pageCount)
                .pageSize(limit)
                .build();
    }
```



```java
    // 책 수정 서비스
    public int updateBook(ReqBookUpdateDto dto) {
        // 중복 체크 로직
        boolean isDuplicate = bookMapper.isBookDuplcateEdit(dto.getTitle(), dto.getId());
        if (isDuplicate) {
            throw new BookException("이미 존재하는 책입니다: ");
        }

        int successCount = bookMapper.updateBook(dto.toEntity());

        if( successCount == 0) {
            throw new BookException("도서를 수정하는 중 오류가 발생했습니다.");
        }
        
        return successCount;
    }
```



```java
entity 구성

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    private int id;
    private String title;
    private String author;
    private String publisher;
    private int price;
    private String img;
}
```



gitHub : https://github.com/qwdltjdals/RGT_Project

프론트 배포 주소 : http://qw2645.dothome.co.kr/
