package pt.unl.fct.di.iadidemo.presentation.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.dto.*


@Tag(name = "User API",
    description = "This API will contain a create user; delete user; read user; list all users; add a book, remove a book " +
            "and list the booklist of a particular user; create and/or update review+rating")
@RequestMapping("/user")
interface UserInterface {

    @Operation(summary = "Creates an User, which contains a name, a password, and a list of book previews and review" +
            "previews.")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "User created successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun createUser(@RequestBody user: User) : User

    @Operation(summary = "Deletes the User with the given user id")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "User deleted successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("{userID}")
    fun deleteUser(@PathVariable userID:Long)

    @Operation(summary = "Gets the User with the given user id")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Found User"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("{userID}")
    fun getUser( @PathVariable userID:Long ): User

    @Operation(summary = "Get all Users")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Returned all users"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping()
    fun getAllUsers() : List<User>


    //-----------missing booklist methods-----------
    ///user/books
    @Operation(summary = "Adds a book to the user's book list")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book added to user's book list."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping("{userID}/books")
    fun addBookToUser(@PathVariable userID: Long, @RequestBody book: Book)

    @Operation(summary = "Retrieves all the books ID's of the user list")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Retrieved all books from user."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("{userID}/books")
    fun getBooksOfUser(@PathVariable userID: Long) : List<BookPreview>

    @Operation(summary = "Deletes the book with bookID from the user with userID list")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Deleted book from user's book list."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("{userID}/books/{bookID}")
    fun deleteBookFromUser(@PathVariable userID: Long, @PathVariable bookID: Long)


    //-----------missing review+rating methods------

    //userID/reviews
    @Operation(summary = "Adds a review to the user's review list")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Review added to user's review list."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping("reviews")
    fun addReview(@RequestParam userID:Long, @RequestBody review: Review) : Review


    @Operation(summary = "Retrieves user's book review.")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Retrieved review from user's specific book."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("reviews/{reviewId}")
    fun getReview(@RequestParam userID: Long, @PathVariable reviewId: Long) : Review


    @Operation(summary = "Retrieves all user's reviews.")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Retrieved reviews from all the user's reviews."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("reviews")
    fun getReviewList(@RequestParam userID: Long) : List<ReviewPreview>

    @Operation(summary = "Deletes the review from the user's reviews.")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Deleted user's review from book."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("reviews/{reviewId}")
    fun deleteReview(@RequestParam userID:Long, @PathVariable reviewId:Long)


    @Operation(summary = "Updates a review on the user's review list")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Review updated in user's review list."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PutMapping("reviews")
    fun updateReview(@RequestParam userID:Long, @RequestBody review: Review)
}