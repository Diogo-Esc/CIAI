package pt.unl.fct.di.iadidemo.presentation.controllers

import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.iadidemo.presentation.api.BookInterface
import pt.unl.fct.di.iadidemo.presentation.dto.Book

@RestController
class BookController : BookInterface {
    override fun createBook(book: Book): Book = Book(book.authorIds,book.title, book.description, book.content)

    override fun deleteBook(@PathVariable bookID: Long): String = "Book $bookID deleted"

    override fun getBook(@PathVariable bookID: Long): Book = Book(mutableSetOf(0),"Example Book","This is an example.", "")

    override fun getAllBooks(): List<Book> = listOf(Book(mutableSetOf(0),"Example Book","This is an example.", ""), Book(mutableSetOf(1),"Example Book 2 ","This is another example.", ""))
}