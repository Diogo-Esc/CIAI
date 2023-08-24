package pt.unl.fct.di.iadidemo.architecture.services

import org.springframework.stereotype.Service
import pt.unl.fct.di.iadidemo.architecture.api.dto.BookDTO
import pt.unl.fct.di.iadidemo.architecture.model.BookDAO
import pt.unl.fct.di.iadidemo.architecture.model.BookRepository
import pt.unl.fct.di.iadidemo.architecture.model.ReviewDAO
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
class BookService(val books:BookRepository) {

    fun getAll(): List<BookDAO> = books.findAll().toList()

    fun addOne(book: BookDAO):Unit { books.save(book) }

    fun getOne(id:Long): Optional<BookDAO> = books.findById(id)

    fun getReviewsOfBook(id:Long): List<ReviewDAO> = books.getReviewsFromBookId(id)

    fun deleteOne(id:Long):Unit {books.deleteById(id)}

    fun getReviewOfBook(id:Long, bid: Long): Optional<ReviewDAO> = books.getReviewFromBookId(id,bid)

    //fun addReviewOfBook(id:Long, review: ReviewDAO)

}
