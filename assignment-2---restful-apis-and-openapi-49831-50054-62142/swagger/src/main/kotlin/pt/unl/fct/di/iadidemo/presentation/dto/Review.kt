package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class Review(@NotBlank val userId:Long, @NotBlank val bookId:Long, @NotBlank var content:String, @NotBlank var rating: Int){
    val reviewId : Int = 0; //should be automatically generated

}