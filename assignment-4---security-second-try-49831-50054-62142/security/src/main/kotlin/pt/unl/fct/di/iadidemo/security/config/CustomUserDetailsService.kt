package pt.unl.fct.di.iadidemo.security.config

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import pt.unl.fct.di.iadidemo.security.application.services.UserService

data class CustomUserDetails(
    private val username:String,
    private val password:String,
    private val authorities:MutableCollection<out GrantedAuthority>) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> = authorities

    override fun isEnabled(): Boolean = true

    override fun getUsername(): String = username

    override fun isCredentialsNonExpired(): Boolean = true

    override fun getPassword(): String = password

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true
}


@Service
class CustomUserDetailsService(val users: UserService) : UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {

        username?.let {
            val user =
                users.findUser(username)
                .orElseThrow { UsernameNotFoundException(username) }
                .let {
                    CustomUserDetails(
                        it.username,
                        it.password,
                        mutableListOf(SimpleGrantedAuthority("ROLE_${it.role}")))
                        // TODO: Authorities need to be gathered from roles or stored as separate authorities in the model
                }

            return user
        }
        throw UsernameNotFoundException("")
    }
}