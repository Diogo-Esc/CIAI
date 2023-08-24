package pt.unl.fct.di.iadidemo.presentation.dto

import javax.validation.constraints.NotBlank

data class AuthorPreview(@NotBlank val authorId: Long, @NotBlank val name: String) {
}