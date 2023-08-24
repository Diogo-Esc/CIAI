package pt.unl.fct.di.iadidemo.architecture

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import pt.unl.fct.di.iadidemo.architecture.model.ReviewDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserRepository

@SpringBootApplication
class ArchitectureApplication(val users:UserRepository) : CommandLineRunner {

    // initialize DB with Data (Users, Authors ...)
    override fun run(vararg args: String?) {
        val u1 = UserDAO("user1", "user1", emptyList<ReviewDAO>());

        users.save(u1)
        print(users.findById("user1").get().name)
    }

}

fun main(args: Array<String>) {
    runApplication<ArchitectureApplication>(*args)
}
