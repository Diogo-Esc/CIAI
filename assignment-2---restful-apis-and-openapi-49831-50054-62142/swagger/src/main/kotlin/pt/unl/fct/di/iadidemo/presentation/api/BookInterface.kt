package pt.unl.fct.di.iadidemo.presentation.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.dto.Book

@Tag(name = "Book API",
    description = "This API will contain a create book; delete book; read book; list all books;")
@RequestMapping("/book")
interface BookInterface {

    @Operation(summary = "Create a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book created successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun createBook(@RequestBody book: Book) : Book

    @Operation(summary = "Delete a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book deleted successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @DeleteMapping("/{bookID}")
    fun deleteBook(@PathVariable bookID:Long): String

    @Operation(summary = "Get a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Found Book"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping("/{bookID}")
    fun getBook( @PathVariable BookID:Long ): Book

    @Operation(summary = "Get all Books")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Returned all Books"),
        ApiResponse(responseCode = "403", description = "Forbidden"),
        ApiResponse(responseCode = "404", description = "Resource not found")
    ])
    @GetMapping()
    fun getAllBooks() : List<Book>


}