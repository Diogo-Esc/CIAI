package pt.unl.fct.di.iadidemo.presentation.controllers

import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.api.UserInterface
import pt.unl.fct.di.iadidemo.presentation.dto.*

@RestController
class UserController : UserInterface {

    override fun createUser(user: User) : User = User(user.username, user.password, listOf(BookPreview(0,
        "DefaultBookName")), listOf(ReviewPreview(0, "DefaultReviewName")));

    override fun deleteUser(userID: Long) {}

    override fun getUser(userID: Long): User = User("bob","1234567890", listOf(BookPreview(0,
        "DefaultBookName")), listOf(ReviewPreview(0, "DefaultReviewName")))

    override fun getAllUsers(): List<User> = listOf(User("bob","1234567890",
        listOf(BookPreview(0, "DefaultBookName")), listOf(ReviewPreview(0, "DefaultReviewName"))),
        User("alice", "1234567890",
        listOf(BookPreview(0, "DefaultBookName")), listOf(ReviewPreview(0, "DefaultReviewName"))))

    override fun addBookToUser(@PathVariable userID: Long, book: Book) {}

    override fun getBooksOfUser(@PathVariable userID: Long): List<BookPreview> = listOf(BookPreview(0, "DefaultTitle"),BookPreview(0, "DefaultTitle"));

    override fun deleteBookFromUser(@PathVariable userID: Long, @PathVariable bookID: Long) {
        //TODO delete book
    }

    override fun addReview(@RequestParam userID: Long, @RequestBody review: Review): Review = Review(userID,
    review.bookId, review.content, review.rating)


    override fun getReview(@RequestParam userID: Long, @PathVariable reviewId: Long): Review = Review(userID, reviewId,
        "default",0)

    override fun getReviewList(@RequestParam userID: Long): List<ReviewPreview> = listOf(ReviewPreview(0, "DefaultReviewName"));

    override fun deleteReview(@RequestParam userID: Long, reviewId: Long) {
        //TODO delete review
    }

    override fun updateReview(@RequestParam userID: Long, review: Review) {
        //TODO update review
    }

}