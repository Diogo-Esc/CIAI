package pt.unl.fct.di.iadidemo.architecture.model

import javax.persistence.*

@Entity
data class BookDAO(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id:Long,

    val title:String,

    @ManyToMany
    val authors:List<AuthorDAO>,

    @OneToMany(mappedBy = "book", orphanRemoval = true, cascade = [(CascadeType.ALL)], fetch = FetchType.EAGER)
    val reviews:List<ReviewDAO>

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
    val book:BookDAO,

    @ManyToOne
    val user:UserDAO
    )

@Entity
data class UserDAO(
    @Id
    val username:String,

    val name:String,

    @OneToMany
    val reviews: List<ReviewDAO>
    )