package pt.unl.fct.di.iadidemo.security.application.services

import org.springframework.stereotype.Service
import pt.unl.fct.di.iadidemo.security.domain.BookDAO
import pt.unl.fct.di.iadidemo.security.domain.BookRepository
import pt.unl.fct.di.iadidemo.security.domain.ReviewDAO
import java.util.*

/**
 * This is a sample class implementing the application logic layer, the service layer.
 *
 * Each service should implement logic that is closely related. It can use
 * other services to orchestrate its functionality.
 *
 * This service declares a dependency for the repository service in the data
 * layer that manipulates the information about books. Notice that the class
 * is annotated with @Service so that Spring can instantiate the corresponding
 * Bean and connect to other components.
 *
 * This implements two sample methods that use and orchestrate methods from the
 * database repository. It can also perform intermediate computations to prepare
 * data.
 */
@Service
class BookService(val books: BookRepository) {

    fun getAll(): List<BookDAO> = books.findAll().toList()

    fun addOne(book: BookDAO):Unit { books.save(book) }

    fun getOne(id:Long): Optional<BookDAO> = books.findById(id)

    fun getReviewsOfBook(id:Long): List<ReviewDAO> = books.getReviewsFromBookId(id)

    fun deleteOne(id:Long):Unit {books.deleteById(id)}

    fun getReviewOfBook(id:Long, bid: Long): Optional<ReviewDAO> = books.getReviewFromBookId(id,bid)
}
