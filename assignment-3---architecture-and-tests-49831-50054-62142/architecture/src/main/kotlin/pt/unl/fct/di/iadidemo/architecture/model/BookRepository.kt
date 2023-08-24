package pt.unl.fct.di.iadidemo.architecture.model

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import java.util.*

interface BookRepository : CrudRepository<BookDAO, Number> {

    // must define a query to efficiently retrieve reviews of a given book
    @Query("FROM ReviewDAO WHERE book.id = ?1")
    fun getReviewsFromBookId(id: Long): List<ReviewDAO>

    @Query("select distinct r from BookDAO b inner join b.reviews r where r.book.id = :id and r.id= :bid")
    fun getReviewFromBookId(id: Long, bid: Long): Optional<ReviewDAO>



}

interface UserRepository : CrudRepository<UserDAO, String> {}

interface AuthorRepository : CrudRepository<AuthorDAO, Number> {}

