package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class BookPreview(@NotBlank val bookId: Long, @NotBlank val title:String) {
}