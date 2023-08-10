# Project Description: Lexicon Learner

Lexicon Learner is a web application designed to help users expand their vocabulary 
by providing a platform for learning and testing their knowledge of words. The 
application utilizes modern web technologies and follows a responsive design approach, 
making it accessible on various devices. By leveraging Lexicon Learner, users can 
enhance their vocabulary, reinforce word meanings, and improve their language 
skills in an interactive and engaging manner.

## Features:

1. User Interface:
   - The application has a clean and intuitive user interface, featuring a consistent navigation bar that displays the title "Lexicon Learner" across all pages.
   - The UI is designed to be visually appealing and user-friendly, providing a seamless experience for users.

2. Home Page:
   - Upon accessing the application, users are presented with the home page that displays two buttons in the center of the screen: "Add a Word" and "Test".
   - These buttons serve as the primary entry points to the core functionalities of the application.

3. Add a Word:
   - Clicking on the "Add a Word" button takes users to a page where they can enter a word they want to learn or explore.
   - Users input the word in a rounded text box and submit the form.
   - The application then utilizes an API to fetch the meaning, synonym, and antonym of the entered word, displaying the results on the page.
   - Users are given the option to add the word, along with its details, to the database by clicking on "Yes" or "No" buttons.

4. Test:
   - Clicking on the "Test" button directs users to a testing page, which serves as a learning and evaluation tool.
   - The page presents one word at a time, with a large font size and a floating div effect.
   - When users tap on a word, the div flips to reveal the actual meaning, synonym, and antonym of the word.
   - Users can then indicate whether they answered correctly by selecting "Yes" or "No".
   - Navigation options are available to move to the previous word or proceed to the next word.
   - Users can continue testing until they have gone through all the words.

5. Score and Percentage:
   - Upon completing the test, the application displays the user's score (total number of correct answers) and the percentage of correct answers.
   - This provides users with feedback on their performance and progress in expanding their vocabulary.

## Technologies Used:

- React: The application is built using React, a popular JavaScript library for building user interfaces.
- MongoDB Atlas: The database connection is established using MongoDB Atlas, a cloud-based database service.
- Axios or Fetch API: These libraries are used to make API calls to fetch word details from an external API.
- Bootstrap: Bootstrap is utilized for creating a modern, responsive, and visually appealing UI.
- CSS: Custom CSS styles are implemented to enhance the application's design and layout.
