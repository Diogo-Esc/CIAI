# Second Laboratory Assignment: Restful API specification
## Internet Applications Design and Implementation 2021/22 

### Introduction

This year's theme is a service to help on the management of its users reading habits. The core of our concern is a service that stores information about books, ratings of books and and the reading habits of its users. Users can collaboratively add information about books, report the ownership of a given book, the desire to read it, and the fact that they read it along with a rating, and a review. This is the general topic for this year, each assignment will add the details needed for each instalment.

Your second assignment is to write the specification of a webservice, that provides the necessary information for this application, using OpenAPI 3.0 

You should start with the provided code and design a RESTful API for the Books, Authors and Users resources using the methodology presented in the course lectures. Also, you should define their relationships and subresources.

You should define the openAPI 3.0 specification using a spring-boot project in kotlin, and using kotlin annotations. Use [Bealdung](https://www.baeldung.com/spring-rest-openapi-documentation) and [Spring doc](https://springdoc.org/) for documentation about spring doc.

Use the provided starter code as the base of your assignment and be sure to use swagger editor to validate and preview your documentation. 

### Technical description

Specify the API covering the following situations:

* List, Create, Read, and Delete the top-level resources Book, Authors, Users (without the login endpoints). 
* List all the books of a user, add and remove a book from the list of books of a user. 
* List all the books of an author, add and remove a book from the list of books of an author.
* Update the review and rating that a user has for a book.

Extra credit: Document the metadata of the webservice using OpenAPI 3.0 annotations, identifying the API, authors, and other useful descriptions using the webservice metadata.

### Submission details

This assignment is a github classroom assignment. You should clone the assignment and push your solution before the defined deadline.

### Evaluation Criteria

The assignment will be graded from 0 to 5 in the following criteria:

* Definition of top-level resources 
* Definition of sub-resources in the API
* The use of packages, interfaces, and classes to implement the interface
* OpenAPI 3.0 documentation for all resources
* Identification of subdivisions in the resources in the OpenAPI specification.
* Extra: OpenAPI 3.0 documentation of the webservice metadata.

### Important Dates

Strict submission deadline: Friday, 22 October 2021

