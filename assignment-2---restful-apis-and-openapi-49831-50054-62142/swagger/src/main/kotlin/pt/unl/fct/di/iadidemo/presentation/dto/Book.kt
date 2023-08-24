package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class Book(@NotBlank var authorList: List<AuthorPreview>, @NotBlank var title:String, @NotBlank var description:String, @NotBlank var content:String, ) {
    var bookId : Int = 0 //should be automatically generated
}