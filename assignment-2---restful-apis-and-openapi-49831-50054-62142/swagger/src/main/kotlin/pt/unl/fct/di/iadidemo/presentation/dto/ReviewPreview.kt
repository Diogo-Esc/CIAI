package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class ReviewPreview(@NotBlank val reviewId: Long, @NotBlank val name: String) {
}