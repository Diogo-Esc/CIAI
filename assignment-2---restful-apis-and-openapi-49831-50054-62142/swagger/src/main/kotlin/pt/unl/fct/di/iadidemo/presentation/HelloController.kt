package pt.unl.fct.di.iadidemo.presentation

import org.springframework.web.bind.annotation.RestController
import pt.unl.fct.di.iadidemo.presentation.api.HelloInterface
import pt.unl.fct.di.iadidemo.presentation.dto.Greeting

@RestController
class HelloController : HelloInterface {
    override fun hello() = Greeting("Hello, World!")

    override fun greeting(name:String) = "Hello ${name}!"

    override fun weirdGreeting(name:Greeting): Greeting = Greeting("Weird hello ${name.message}!")

    override fun bye(name:String) = "Bye ${name}!"
}