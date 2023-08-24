# Fourth Laboratory Assignment: Security Concepts and Implementation
## Internet Applications Design and Implementation 2021/22

(Final version, 12th Nov 2021)

### Introduction

This year's theme is a service to help with the management of its users reading habits. The core of our concern is a service that stores information about books, ratings of books and the reading habits of its users. Users can collaboratively add information about books, report the ownership of a given book, the desire to read it, and the fact that they read it along with the possibility of recording a rating and a review. This is the general topic for this year. Each assignment will add the details needed for each instalment.

Your fourth assignment is to implement a secure application that enforces a set of given security policies. The technical details section enumerates them and gives some hints on how to implement them.

You should use Kotlin and Spring, the spring-security module, and the recommended method to define model-based security policies.

Extra credit: 

### Technical details

You should extend the starter code with authentication and authorization methods to implement the following features:

* An endpoint for public access
* An administration API that has total control over all resources made available
* An user area with controlled access to resources (see access control rules listed below)
* Sign-up, Sign-in and sign-out REST-based endpoints
* Token-based authentication (carrying relevant role information) for all endpoints
* Simple role-based-access control for users with role ADMIN (see rules below)
* Role-based access control policies for users with role EDITOR (see rules below)
* Model-based access control policies (see rules below) 

Extra credit: To add a state field to books (DRAFT, SUBMITTED, DELETED). Only allow users to review a book if it is in state SUBMITTED.

The detailed access-control policies to be implemented are the following:

* The information about books containing title, author, and description is accessible to registered and unregistered users
* The information about books regarding reviews, ratings, and ownership of books is only accessible to registered users
* A user can only edit and delete their reviews.
* A user can only create ratings or reviews with their username.
* A book can only be erased by an administrator (it may belong to many users). Note: all book's reviews must be erased with it (and other related information).
* Any user with the role "EDITOR" can create a new book.
* Any user with more than ten (10) reviews can create a new book.
* A book can only be edited by a user that owns it.
* An ADMIN user can perform any operation listed above.

Start with the provided project that contains the code from lectures and extend it accordingly. Provide tests to prove that your authentication and authorization operations are working in place.

### Submission details

This assignment is a GitHub classroom assignment. You should clone the assignment and push your solution before the defined deadline.

### Evaluation Criteria

The assignment will be graded from 0 to 5 in the following criteria:

* Correct use of Spring Security to configure public and private endpoints 
* Correct implementation of dynamic user management features
* Correct use of filters to implement token-based authentication (with roles in the token)
* Implementation of the sign-out operation based on tokens
* Implementation of role-based authorization rules
* Implementation of simple model-based authorization rules
* Efficient queries in book and user-related information
* Performing tests with security information involved (including dynamic rules)
* Extra: Implementation of dynamic data based authorization rules (e.g. checking a status)

### Important Dates

Strict submission deadline: Friday, 21st of November 2021

