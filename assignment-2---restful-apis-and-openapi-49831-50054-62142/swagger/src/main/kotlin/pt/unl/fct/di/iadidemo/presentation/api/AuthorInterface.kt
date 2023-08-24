package pt.unl.fct.di.iadidemo.presentation.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.dto.Author
import pt.unl.fct.di.iadidemo.presentation.dto.BookPreview

@Tag(name = "Author API",
        description = "This API will contain a create author; delete author; read author; list all authors; add, remove and list the" +
                " books written by a particular author")
@RequestMapping("/authors")
interface AuthorInterface {

    @Operation(summary = "Create an Author")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Author created successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun createAuthor(@RequestBody author: Author) : Author

    @Operation(summary = "Delete an Author")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Author deleted successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("/{authorID}")
    fun deleteAuthor(@PathVariable authorID:Long)

    @Operation(summary = "Get an Author")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Found Author"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("/{authorID}")
    fun getAuthor( @PathVariable authorID:Long ): Author

    @Operation(summary = "Get all Authors")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Returned all authors"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping()
    fun getAllAuthors() : List<Author>

    @Operation(summary = "List books written by an author with a given id")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Successfully listed books written by the author with the given id"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("/{authorID}/books")
    fun getBooksOfAuthor(@PathVariable authorID:Long) : List<BookPreview> //RETURNS list of bookID

    @Operation(summary = "Add a book to the list of books written by an author with a given id")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Successfully added a book to the list of books written by the author with the given id"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping("/{authorID}/books")
    fun addBookToAuthor(@PathVariable authorID:Long, @RequestBody bookID: Long)

    @Operation(summary = "Remove a book from the list of books written by an author with a given id")
    @ApiResponses(value = [
        ApiResponse(responseCode = "204", description = "Successfully removed the book from the list of books written by the author with the given id"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("/{authorID}/books/{bookID}")
    fun removeBookFromAuthor(@PathVariable authorID:Long, @PathVariable bookID: Long)

}