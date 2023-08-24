package pt.unl.fct.di.iadidemo.architecture

import com.fasterxml.jackson.databind.ObjectMapper
import net.minidev.json.JSONObject
import org.junit.Assert
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.mockito.Mockito.doNothing
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import pt.unl.fct.di.iadidemo.architecture.api.dto.*
import pt.unl.fct.di.iadidemo.architecture.model.BookDAO
import pt.unl.fct.di.iadidemo.architecture.model.ReviewDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserDAO
import pt.unl.fct.di.iadidemo.architecture.model.UserRepository
import pt.unl.fct.di.iadidemo.architecture.services.BookService
import java.util.*


@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTests {

    @Autowired
    lateinit var mvc:MockMvc

    @MockBean
    lateinit var books: BookService


    companion object {

        val user0 = UserDAO("user1", "user1", emptyList())

        val bookListDto0 = BookListDTO(0,"LOR", emptyList(), emptyList())
        val bookListDto1 = BookListDTO(1,"LOR", emptyList(), emptyList())
        val bookListDto2 = BookListDTO(2, "Dune", emptyList(), emptyList())
        

        val bookDao0 = BookDAO(0,"LOR", emptyList(), emptyList())
        val bookDao1 = BookDAO(1,"LOR", emptyList(), emptyList())
        val bookDao2 = BookDAO(2, "Dune", emptyList(), emptyList())

        val bookDaoChanged0 = BookDAO(0,"LOR-Changed", emptyList(), emptyList())



        val reviewDao0 = ReviewDAO(0, "amazing", 9, bookDao0, user0)
        val reviewDao1 = ReviewDAO(0, "outstanding", 10, bookDao0, user0)

        val reviewBookLongDto0 = ReviewBookLongDTO("amazing", 9, user0.username, bookDao0.id)

        val reviewBookDto0 = ReviewBookDTO(0,"amazing", 9, user0.username)
        val reviewBookDto1 = ReviewBookDTO(0,"outstanding", 10, user0.username)

        val reviewDto0 = ReviewDTO("amazing",9)
        val reviewDto1 = ReviewDTO("outstanding",10)


        val bookDao0withReview = BookDAO(0,"LOR", emptyList(), listOf(reviewDao0))
        val bookDao0withReviewChanged = BookDAO(0,"LOR", emptyList(), listOf(reviewDao1))




        val listOfBookListDto = listOf<BookListDTO>(bookListDto1,bookListDto2)

        val listOfBookDao = listOf<BookDAO>(bookDao1,bookDao2)

        val listOfReviewDao = listOf<ReviewDAO>(reviewDao0,reviewDao1)

        val listOfReviewDto = listOf<ReviewBookDTO>(reviewBookDto0,reviewBookDto1)

        val listOfReviewBookDto = listOf<ReviewBookDTO>(reviewBookDto0)



        val mapper = ObjectMapper()

        val BookDto1_ToJSON = mapper.writeValueAsString(BookDTO("LOR"))

        val BookDtoChange_ToJSON = mapper.writeValueAsString(BookDTO("LOR-Changed"))

        val BookListDto0_ToJSON = mapper.writeValueAsString(bookListDto0)

        val reviewDto0_ToJSON = mapper.writeValueAsString(reviewDto0)

        val reviewDto1_ToJSON = mapper.writeValueAsString(reviewDto1)

        val reviewBookLongDto0_ToJSON = mapper.writeValueAsString(reviewBookLongDto0)


        val listOfBookListDto_ToJSON = mapper.writeValueAsString(listOfBookListDto)

        val listOfReviewDto_ToJSON = mapper.writeValueAsString(listOfReviewDto)

        val listOfReviewBookDto_ToJSON = mapper.writeValueAsString(listOfReviewBookDto)
    }

    @Test
    fun `Test GET books`() {
        Mockito.`when`(books.getAll()).thenReturn(listOfBookDao)

        val s =
            mvc.perform(get("/books"))
                .andExpect(status().isOk)
                .andExpect(content().string(listOfBookListDto_ToJSON))
                .andReturn()

        println(listOfBookListDto)
        println(s.response.contentAsString)
    }

    fun <T>nonNullAny(t:Class<T>): T = Mockito.any(t)

    @Test
    fun `Test ADDONE book`() {
        Mockito.`when`(books.addOne(nonNullAny(BookDAO::class.java)))
            .then{
                val o = it.getArgument<BookDAO>(0)
                Assert.assertEquals(o, bookDao0)
            }

        mvc.perform(post("/books")
            .content(BookDto1_ToJSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)

    }

    @Test
    fun `Test GETONE book`() {
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0))

        val s =
            mvc.perform(get("/books/0"))
                .andExpect(status().isOk)
                .andExpect(content().string(BookListDto0_ToJSON))
                .andReturn()

        println(bookListDto0)
        println(s.response.contentAsString)
    }

    @Test
    fun `Test DELETEONE book`() {
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0))
        Mockito.`when`(books.deleteOne(nonNullAny(Long::class.java)))
            .then{
                val id = it.getArgument<Long>(0)
                print(id)
                Assert.assertEquals(id, 0)
            }

        val s =
            mvc.perform(delete("/books/0"))
                .andExpect(status().isOk)

    }

    @Test
    fun `Test GETREVIEWBOOK book`() {

        Mockito.`when`(books.getReviewOfBook(0, 0)).thenReturn(Optional.of(reviewDao0))
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0))

        val s =
            mvc.perform(get("/books/0/reviews/0"))
                .andExpect(status().isOk)
                .andExpect(content().string(reviewBookLongDto0_ToJSON))
                .andReturn()

        println(reviewBookDto0)
        println(s.response.contentAsString)
    }

    @Test
    fun `Test GETALLREVIEWS book`() {
        Mockito.`when`(books.getReviewsOfBook(0)).thenReturn(listOfReviewDao)

        val s =
            mvc.perform(get("/books/0/reviews"))
                .andExpect(status().isOk)
                .andExpect(content().string(listOfReviewDto_ToJSON))
                .andReturn()

        println(listOfReviewDto)
        println(s.response.contentAsString)

    }

    @Test
    fun `Test ADDREVIEW book`() {
        
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0))


        Mockito.`when`(books.addOne(nonNullAny(BookDAO::class.java)))
            .then{
                val o = it.getArgument<BookDAO>(0)
                Assert.assertEquals(o.toString(), bookDao0withReview.toString())
            }

        val s =
            mvc.perform(post("/books/0/reviews")
                .content(reviewDto0_ToJSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk)
                .andExpect(content().string(listOfReviewBookDto_ToJSON))
                .andReturn()

        println(listOfReviewBookDto)
        println(s.response.contentAsString)
    }


    @Test
    fun `Test UPDATEREVIEW book`() {

        Mockito.`when`(books.getReviewOfBook(0,0)).thenReturn(Optional.of(reviewDao0))
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0withReview))
        Mockito.`when`(books.addOne(nonNullAny(BookDAO::class.java)))
            .then{
                val o = it.getArgument<BookDAO>(0)
                print(o)
                Assert.assertEquals(o, bookDao0withReviewChanged)
            }

        mvc.perform(put("/books/0/reviews/0")
            .content(reviewDto1_ToJSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)

    }


    @Test
    fun `Test DELETEREVIEW book`() {
        Mockito.`when`(books.getReviewOfBook(0,0)).thenReturn(Optional.of(reviewDao0))
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0withReview))
        Mockito.`when`(books.addOne(nonNullAny(BookDAO::class.java)))
            .then{
                val o = it.getArgument<BookDAO>(0)
                print(o)
                Assert.assertEquals(o, bookDao0)
            }

        mvc.perform(delete("/books/0/reviews/0"))
            .andExpect(status().isOk)

    }


    @Test
    fun `Test UPDATEONE book`() {
        Mockito.`when`(books.getOne(0)).thenReturn(Optional.of(bookDao0))
        Mockito.`when`(books.addOne(nonNullAny(BookDAO::class.java)))
            .then{
                val o = it.getArgument<BookDAO>(0)
                print(o)
                Assert.assertEquals(o, bookDaoChanged0)
            }

        mvc.perform(put("/books/0")
            .content(BookDtoChange_ToJSON)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)


    }
}