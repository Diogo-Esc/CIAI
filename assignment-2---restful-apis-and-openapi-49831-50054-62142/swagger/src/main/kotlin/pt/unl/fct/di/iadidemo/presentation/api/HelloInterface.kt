package pt.unl.fct.di.iadidemo.presentation.api

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import pt.unl.fct.di.iadidemo.presentation.dto.Greeting

@Tag(name = "Hello API",
    description = "This is a sample of Swagger usage in IADI 2021/22.")
@RequestMapping("/hello")
interface HelloInterface {

    @Operation(summary = "Get a Greeting")
    @ApiResponses(value = [
        ApiResponse(responseCode = "200", description = "Found Greeting")
    ])
    @GetMapping
    fun hello(): Greeting

    @PostMapping("{name}")
    fun greeting(@PathVariable name:String): String

    @PutMapping("")
    fun weirdGreeting(@RequestBody name:Greeting): Greeting

    @DeleteMapping("")
    fun bye(@RequestParam name:String): String
}