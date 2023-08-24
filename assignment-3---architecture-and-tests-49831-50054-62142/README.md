# Third Laboratory Assignment: Architecture and Tests
## Internet Applications Design and Implementation 2021/22 

### Introduction

This year's theme is a service to help with the management of its users reading habits. The core of our concern is a service that stores information about books, ratings of books and the reading habits of its users. Users can collaboratively add information about books, report the ownership of a given book, the desire to read it, and the fact that they read it along with a rating and a review. This is the general topic for this year. Each assignment will add the details needed for each instalment.

Your third assignment is to implement a vertical slice of the complete architecture and corresponding tests for a server application. The architecture should contain the presentation layer (controllers), the application layer (services), and the data layer using JPA and Spring Data with an H2 in-memory database. The said vertical slice should implement the given RESTful interface for the top-level resource `Book` and its subresources.

One important part of this assignment is also the development of automatic tests using JUnit4 (or JUnit5), and the use of mocks to isolate the different parts of the architecture.

Use the provided starter code in folder `architecture` as the base of your assignment and be sure to use automatic tests to be sure that the webservice is well implemented.

Extra credit: Research, configure and run automatic tests in the GitHub repository using continuous integration mechanisms and GitHub Actions.

### Technical details

* Endpoints and service to access the books resource
* Endpoints to retrieve the reviews/ratings of a particular book
* Endpoint to add, delete, or update a review/rating to a book 
* Junit tests for all the endpoints of this API 
* Provide mockup components for the automatic tests for the designated resource.

### Submission details

This assignment is a GitHub classroom assignment. You should clone the assignment and push your solution before the defined deadline.

### Evaluation Criteria

The assignment will be graded from 0 to 5 in the following criteria:

* Correct definition of three levels of architecture
* Definition of JPA classes and custom queries to efficiently retrieve 
* Correct usage of component assembling techniques to connect the different layers
* Usage of HTTP Scripts to exercise endpoints
* Automatic JUnit tests with relevant mockup components working (the most important criteria)
* Extra credit: Automatic tests running remotely with GitHub Actions.

### Important Dates

Strict submission deadline: Friday, 5 November 2021

