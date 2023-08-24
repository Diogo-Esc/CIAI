package pt.unl.fct.di.iadidemo.security.application.services

import org.springframework.http.HttpStatus
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException
import pt.unl.fct.di.iadidemo.security.domain.UserDAO
import pt.unl.fct.di.iadidemo.security.domain.UserRepository

@Component("mySecurityService")
class MySecurityService(val books: BookService, val users: UserRepository){

    fun isWriterOfReview(user : User, reviewId: Long, bookId : Long) : Boolean {
        var rev = books.getReviewOfBook(bookId, reviewId)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found ${reviewId}") }

            return rev.user.username == user.username;
    }

    fun hasMoreThanTenReviews(user: User) : Boolean {
        val u = users.getUserFromUsername(user.username).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "User not found ${user.username}") }//should never happen
        return u.reviews.size >= 10
    }

    fun isOwnerOfBook(user: User, bookId: Long) : Boolean {
        return books.getOne(bookId).orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found ${bookId}") }.owner.username.equals(user.username)
    }
}