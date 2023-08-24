package pt.unl.fct.di.iadidemo.security.presentation.api

import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.security.presentation.api.dto.*

@RequestMapping("admin/books")
interface BooksAdminAPI : GenAPI<BookDTO, BookListDTO, BookListDTO> {

    @DeleteMapping("{id}")
    fun deleteOne(@PathVariable id:Long):Unit;

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