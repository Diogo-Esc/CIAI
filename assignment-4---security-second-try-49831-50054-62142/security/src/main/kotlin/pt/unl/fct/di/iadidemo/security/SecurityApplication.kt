package pt.unl.fct.di.iadidemo.security

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import pt.unl.fct.di.iadidemo.security.domain.*

@SpringBootApplication
class SecurityApplication(val books:BookRepository, val users:UserRepository) : CommandLineRunner {
    override fun run(vararg args: String?) {


        var b = BookDAO(0,"LOR", emptyList(),  emptyList())
        books.save(b)


        println(BCryptPasswordEncoder().encode("password1"))
        val u1 = UserDAO("user1",BCryptPasswordEncoder().encode("password1"),"USER","User 1", emptyList() ,emptyList())
        users.save(u1)

        val u2 = UserDAO("admin1",BCryptPasswordEncoder().encode("password1"),"ADMIN","Admin 1", emptyList(), emptyList() )
        users.save(u2)

        //val r = ReviewDAO(0, "review.message", 10, b, u1)

        //b = BookDAO(0,"LOR", emptyList(), listOf(r))
        //books.save(b)


    }

}

fun main(args: Array<String>) {
    runApplication<SecurityApplication>(*args)
}
