# Fifth Laboratory Assignment: Basic Web Technologies
## Internet Applications Design and Implementation 2021/22 

### Introduction

This year's theme is a service to help in the management of its users reading habits. The core of our concern is a service that stores information about books, ratings of books and the reading habits of its users. Users can collaboratively add information about books, report the ownership of a given book, the desire to read it, and the fact that they read it along with the possibility of recording a rating and a review. This is the general topic for this year. Each assignment will add the details needed for each instalment.

Your fifth assignment is to specify and implement a user interface that covers a set of given user stories. The technical details section enumerates them and introduces some hints on how to implement them.

You should use IFML for the specification diagram(s), TypeScript and React for the implementation, and the methods recommended in the lectures and lab classes to guide in the definition of a fluid and effective user interface. 

### Technical details

your user interface must cover the following user stories:

* As an anonymous user, I want to access the homepage so that I can see the list of available books with their title, author, picture.

* As an anonymous user, I want to access the list of books so that I can select a book and see the details of the book, including more pictures and the synopsis 

* As a registered user, I want to access the list of books so that I can select a book and see the details of the book, including more pictures and the synopsis

* As a registered user, I want to search the list of books by name and rating (as in lists of products in amazon filtered by stars), so that I can select a book and see the details of the book, including more pictures and the synopsis

* As a registered user, I want to access the details of a selected book so that I can see the list of reviews ordered by date or rating.

* As a registered user, I want to access the details of a selected book so that I add a review and a rating to the book and see the result in the list of reviews of the book.

* As a registered user, I want to access the list of reviews ordered by date or rating so that I can edit a review.

* As a registered user, I want to see the homepage so that I can add a new book and see the results in the list of books. 

* As an admin user, I want to see the list of books and select a book so that I see the list of reviews of that book.

* As an admin user, I want to see the list of reviews of a book, delete a review, and see the result in the list of reviews of the book.

You should produce one IFML diagram that depicts the user stories above and implements the user interface using React and TypeScript. You can choose to separate the diagram into smaller diagrams.

Please refer to the Gmail example at [ifml.org](http://ifml.org) to learn more about the IFML components and their usage. 

In the implementation you should include JSON files that contain the necessary seed data for the user interface to work. Actions that add data should work on the client side and log in the console the information on POST requests that would be necessary.

### Submission details

This assignment is a GitHub classroom assignment. You should clone the assignment and push your solution before the defined deadline. Start with the assignment repository and use the empty react application in the repository to start implementing your user interface.

Your submission should contain a pdf with your diagram (or diagrams) and a React application (without the `node_modules` folder). 

### Evaluation Criteria

The assignment will be graded from 0 to 5 in the following criteria:

* Correct use of IFML view components, containers, navigation flows, actions, and parameter binding elements
* Completeness of the IFML diagram with relation to the user stories
* Correspondence between the IFML diagrams and the component React structure.

### Important Dates

Strict submission deadline: Monday, 13 December 2021

