package pt.unl.fct.di.iadidemo.security.domain

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import java.util.*

interface UserRepository : CrudRepository<UserDAO,String> {

    @Query("from UserDAO where username = :username")
    fun getUserFromUsername(username: String): Optional<UserDAO>
}