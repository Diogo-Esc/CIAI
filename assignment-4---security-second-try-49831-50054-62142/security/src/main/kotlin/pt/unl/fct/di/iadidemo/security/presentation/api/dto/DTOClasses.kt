package pt.unl.fct.di.iadidemo.security.presentation.api.dto



data class BookDTO(val title:String)

data class BookListPublicDTO(val id:Long, val title:String, val authors:List<AuthorsBookDTO>)

data class BookListDTO(val id:Long, val title:String, val authors:List<AuthorsBookDTO>, val reviews:List<ReviewBookDTO>)



data class AuthorsBookDTO(val name:String)



data class ReviewDTO(val message:String, val rating:Number)

data class ReviewBookDTO(val id:Long, val message:String, val rating:Number, val username:String)

data class ReviewBookLongDTO(val message:String, val rating:Number, val username:String, val bookId:Long)



