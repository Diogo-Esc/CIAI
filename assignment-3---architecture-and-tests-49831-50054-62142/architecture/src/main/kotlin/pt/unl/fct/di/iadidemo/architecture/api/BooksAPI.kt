package pt.unl.fct.di.iadidemo.api

import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.architecture.api.GenAPI
import pt.unl.fct.di.iadidemo.architecture.api.dto.*

@RequestMapping("books")
interface BooksAPI : GenAPI<BookDTO,BookListDTO,BookListDTO> {

    @GetMapping("{id}/reviews")
    fun getReviews(@PathVariable id:Long):List<ReviewBookDTO>

    @PostMapping("{id}/reviews")
    fun addReview(@PathVariable id:Long, @RequestBody review: ReviewDTO):List<ReviewBookDTO>

    @GetMapping("{id}/reviews/{bid}")
    fun getReviewOfBook(@PathVariable id:Long, @PathVariable bid:Long): ReviewBookLongDTO

    @PutMapping("{id}/reviews/{bid}")
    fun updateReviewOfBook(@PathVariable id:Long, @PathVariable bid:Long, @RequestBody review: ReviewDTO):Unit

    @DeleteMapping("{id}/reviews/{bid}")
    fun deleteReviewOfBook(@PathVariable id:Long, @PathVariable bid:Long):Unit
}