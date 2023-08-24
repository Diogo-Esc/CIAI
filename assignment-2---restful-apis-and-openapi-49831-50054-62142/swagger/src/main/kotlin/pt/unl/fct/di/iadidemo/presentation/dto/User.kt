package pt.unl.fct.di.iadidemo.presentation.dto

import nonapi.io.github.classgraph.json.Id
import javax.annotation.processing.Generated
import javax.validation.constraints.NotBlank


data class User(@NotBlank val username:String, @NotBlank val password:String,
                var bookList: List<BookPreview>, var reviewList: List<ReviewPreview>) {
    val userId : Long = 0; //TODO generate value
}
