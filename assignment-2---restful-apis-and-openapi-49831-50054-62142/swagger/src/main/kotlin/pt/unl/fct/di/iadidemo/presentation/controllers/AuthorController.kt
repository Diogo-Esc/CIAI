package pt.unl.fct.di.iadidemo.presentation.controllers

import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.api.AuthorInterface
import pt.unl.fct.di.iadidemo.presentation.dto.Author
import pt.unl.fct.di.iadidemo.presentation.dto.BookPreview

@RestController
class AuthorController : AuthorInterface {

        override fun createAuthor(author: Author): Author = Author ("bob", listOf(
                BookPreview(0, "DefaultTitle"),
                BookPreview(0, "DefaultTitle")
        ))

        override fun deleteAuthor(authorID: Long){}

        override fun getAuthor(authorID: Long): Author = Author("bob", listOf(
                BookPreview(0, "DefaultTitle"),
                BookPreview(0, "DefaultTitle")
        ))

        override fun getAllAuthors(): List<Author> = listOf(Author("bob", listOf(
                BookPreview(0, "DefaultTitle"),
                BookPreview(0, "DefaultTitle")
        )), Author("alice", listOf(
                BookPreview(0, "DefaultTitle"),
                BookPreview(0, "DefaultTitle")
        )))

        override fun getBooksOfAuthor(authorID: Long) : List<BookPreview> = listOf(
                BookPreview(0, "DefaultTitle"),
                BookPreview(0, "DefaultTitle")
        )

        override fun addBookToAuthor(authorID: Long, bookID: Long) {}

        override fun removeBookFromAuthor(authorID: Long, bookID: Long) {}
}