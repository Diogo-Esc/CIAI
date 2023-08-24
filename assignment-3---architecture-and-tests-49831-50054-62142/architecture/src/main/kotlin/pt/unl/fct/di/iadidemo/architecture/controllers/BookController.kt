package pt.unl.fct.di.iadidemo.architecture.controllers

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import pt.unl.fct.di.iadidemo.api.BooksAPI
import pt.unl.fct.di.iadidemo.architecture.api.dto.*
import pt.unl.fct.di.iadidemo.architecture.model.BookDAO
import pt.unl.fct.di.iadidemo.architecture.model.ReviewDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserRepository
import pt.unl.fct.di.iadidemo.architecture.services.BookService
import javax.transaction.Transactional

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
class BookController(val books: BookService, val users: UserRepository) : BooksAPI {

    override fun getAll(): List<BookListDTO> =
        books.getAll().map { BookListDTO(it.id, it.title, emptyList(), emptyList()); };

    override fun addOne(book: BookDTO):Unit =
        books.addOne(BookDAO(0,book.title, emptyList(), emptyList()));

    override fun getOne(id:Long):BookListDTO =
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
                BookDAO(it.id,elem.title,it.authors,it.reviews);
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
                    it.reviews.plus(ReviewDAO(0, review.message, review.rating, it, u))
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
                    it.reviews.minus(rev).plus(ReviewDAO(bid, review.message, review.rating, BookDAO(it.id,it.title,it.authors,
                        emptyList()), rev.user))
                )
            }
        //update the book
        books.addOne(b)
    }

    override fun deleteReviewOfBook(id: Long, bid: Long) {
        var review = books.getReviewOfBook(id, bid).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found ${id}") }
        var b = books.getOne(id)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${id}") }.let {
                BookDAO(
                    it.id,
                    it.title,
                    it.authors,
                    it.reviews.minus(review)
                )
            }
        //update the book
        books.addOne(b)
    }
}