package pt.unl.fct.di.iadidemo.security.domain

import javax.persistence.*


@Entity
data class BookDAO(
    @Id @GeneratedValue
    val id:Long,

    val title:String,

    @ManyToMany
    val authors:List<AuthorDAO>,

    @OneToMany
    val reviews:List<ReviewDAO>,

    @ManyToOne
    val owner:UserDAO

    )


@Entity
data class AuthorDAO(
    @Id @GeneratedValue
    val id:Long,

    val name:String,

    @ManyToMany
    val books:List<BookDAO>
    )

@Entity
data class ReviewDAO(
    @Id @GeneratedValue
    val id:Long,

    val review:String,

    val rating:Number,

    @ManyToOne
    val book: BookDAO,

    @ManyToOne
    val user: UserDAO
    )

@Entity
data class UserDAO(
    @Id
    val username:String,

    var password:String,

    val role:String,

    val name:String,

    @OneToMany
    var userToken: List<UserTokenDAO>,

    @OneToMany
    val reviews: List<ReviewDAO>
    )

@Entity
data class UserTokenDAO(
    @Id
    var token: String,

    var valid: Boolean,

    @ManyToOne
    val user: UserDAO
)