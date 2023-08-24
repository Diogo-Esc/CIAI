package pt.unl.fct.di.iadidemo.bookshelf.presentation.api

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.bookshelf.presentation.api.dto.*

@Tag(name = "Book API",
    description = "This API will contain a list all books; create book;  read book; update book; delete book; ")

@CrossOrigin
@RequestMapping("user/books")
interface BooksAPI : GenAPI<BookDTO, BookListDTO, BookListDTO>