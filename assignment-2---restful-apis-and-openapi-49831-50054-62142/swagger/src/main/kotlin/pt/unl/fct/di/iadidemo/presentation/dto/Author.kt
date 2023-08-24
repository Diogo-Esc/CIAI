package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class Author(@NotBlank val name:String, var bookList: List<BookPreview>){
    val authorId : Long = 0; //TODO generate value
}
