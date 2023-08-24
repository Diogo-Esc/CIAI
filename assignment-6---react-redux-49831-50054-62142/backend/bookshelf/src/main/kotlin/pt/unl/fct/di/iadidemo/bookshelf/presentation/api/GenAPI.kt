package pt.unl.fct.di.iadidemo.bookshelf.presentation.api

import io.swagger.v3.oas.annotations.*
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

interface GenAPI<S,T,U> { // S - InDTO, T - ListDTO, U - LongDTO

    @Operation(summary = "Get all Books")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Returned all Books."),
        ApiResponse(responseCode = "403", description = "Forbidden."),
        ApiResponse(responseCode = "404", description = "Resource not found.")
    ])
    @GetMapping
    fun getAll():List<T>;

    @Operation(summary = "Create a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book created successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden."),
        ApiResponse(responseCode = "404", description = "Resource not found.")
    ])
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun addOne(@RequestBody elem:S):U;

    @Operation(summary = "Get a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Found Book."),
        ApiResponse(responseCode = "403", description = "Forbidden."),
        ApiResponse(responseCode = "404", description = "Resource not found.")
    ])
    @GetMapping("{id}")
    fun getOne(@PathVariable id: Long): U

    @Operation(summary = "Update a Book")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book updated successfully."),
        ApiResponse(responseCode = "204", description = "Book updated successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden."),
        ApiResponse(responseCode = "404", description = "Resource not found.")
    ])
    @PutMapping("{id}")
    fun updateOne(@PathVariable id: Long, @RequestBody elem:S) : Unit

    @Operation(summary = "Delete a Book", description = "Only used by admin")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Book deleted successfully."),
        ApiResponse(responseCode = "403", description = "Forbidden."),
        ApiResponse(responseCode = "404", description = "Resource not found.")
    ])
    @DeleteMapping("{id}")
    fun deleteOne(@PathVariable id:Long):Unit;
}

