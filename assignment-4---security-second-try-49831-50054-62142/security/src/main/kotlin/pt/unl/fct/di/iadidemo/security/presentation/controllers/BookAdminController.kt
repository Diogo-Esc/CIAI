package pt.unl.fct.di.iadidemo.security.presentation.controllers

import org.springframework.http.HttpStatus
import org.springframework.security.access.annotation.Secured
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import pt.unl.fct.di.iadidemo.security.domain.BookDAO
import pt.unl.fct.di.iadidemo.security.application.services.BookService
import pt.unl.fct.di.iadidemo.security.domain.ReviewDAO
import pt.unl.fct.di.iadidemo.security.domain.UserRepository
import pt.unl.fct.di.iadidemo.security.presentation.api.BooksAdminAPI
import pt.unl.fct.di.iadidemo.security.presentation.api.dto.*

/**
 * This is a sample class implementing the presentation logic layer for REST services,
 * the controller layer.
 *
 * Each controller implements a set of endpoints declared in a API interface. It performs
 * data format transformation and prepares answers to the REST clients.
 *
 * This controller implements two sample endpoints that use and orchestrate methods
 * from one or more components from the service layer. Notice the use of DTO classes
 * to define the types of the enpoint parameters and results. Data transformations are
 * necessary in all cases.
 */

@RestController
class BookAdminController(val books: BookService, val users: UserRepository) : BooksAdminAPI {

    override fun getAll(): List<BookListDTO> =
        books.getAll().map { BookListDTO(it.id, it.title, emptyList(), emptyList()); };

    override fun addOne(book: BookDTO):Unit {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
        val currentPrincipalName: String = authentication.getName()
        val u = users.findById(currentPrincipalName).get()
        books.addOne(BookDAO(0,book.title, emptyList(), emptyList(), u));
    }

    override fun getOne(id:Long): BookListDTO =
        books
            .getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }
            .let {
                BookListDTO(
                    it.id,
                    it.title,
                    it.authors.map { AuthorsBookDTO(it.name) },
                    it.reviews.map { ReviewBookDTO(it.id, it.review, it.rating, it.user.username) }
                )
            }

    override fun updateOne(id: Long, elem: BookDTO) {
        var b = books.getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }
            .let {
                BookDAO(it.id,elem.title,it.authors,it.reviews, it.owner);
            }
        books.addOne(b)
    }

    override fun deleteOne(id: Long) {
        //check if books exists
        books.getOne(id).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }
        books.deleteOne(id)
    }

    override fun getReviews(id: Long): List<ReviewBookDTO> =
        books.getReviewsOfBook(id).map { ReviewBookDTO(it.id,it.review,it.rating,it.user.username); }

    override fun addReview(id: Long, review: ReviewDTO): List<ReviewBookDTO> {
        val u = users.findById("user1").get()
        var b = books.getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }.let {
                BookDAO(
                    it.id,
                    it.title,
                    it.authors,
                    it.reviews.plus(ReviewDAO(0, review.message, review.rating, it, u)),
                    it.owner
                )
            }
        //update the book
        books.addOne(b)

        return b.reviews.map { ReviewBookDTO(it.id, it.review, it.rating, it.user.username) }
    }

    override fun getReviewOfBook(id: Long, bid: Long): ReviewBookLongDTO =
        books.getReviewOfBook(id, bid).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found ${id}") }
            .let {
                ReviewBookLongDTO(
                    it.review,
                    it.rating,
                    it.user.username,
                    it.book.id)
            }

    override fun updateReviewOfBook(id: Long, bid: Long, review: ReviewDTO) {
        var rev = books.getReviewOfBook(id, bid)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found ${id}") }
        var b = books.getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }.let {
                BookDAO(
                    it.id,
                    it.title,
                    it.authors,
                    it.reviews.minus(rev).plus(
                        ReviewDAO(bid, review.message, review.rating, BookDAO(it.id,it.title,it.authors,
                            emptyList(), it.owner), rev.user)
                    ),
                    it.owner
                )
            }
        //update the book
        books.addOne(b)
    }

    @PreAuthorize("@mySecurityService.isWriterOfReview(principal,bid,id)")
    override fun deleteReviewOfBook(id: Long, bid: Long) {
        var review = books.getReviewOfBook(id, bid).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found ${id}") }
        var b = books.getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }.let {
                BookDAO(
                    it.id,
                    it.title,
                    it.authors,
                    it.reviews.minus(review),
                    it.owner
                )
            }
        //update the book
        books.addOne(b)
    }
}