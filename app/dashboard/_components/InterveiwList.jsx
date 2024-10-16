"use client"

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import TempComp from "./Temp.jsx";


function InterviewList() {

    const dummyData = [
  {
    "id": 24,
    "jsonMockResp": "[\n{\"question\": \"What are the key differences between React and Angular, and when would you choose one over the other?\", \"answer\": \"React and Angular are both popular front-end frameworks, but they have distinct philosophies and strengths. React emphasizes component-based development with a focus on flexibility and reusability, while Angular promotes a more structured approach with robust features like dependency injection and a powerful templating engine. Choosing between them depends on the project's complexity, scalability, and the team's familiarity with each framework.\"},\n{\"question\": \"Describe your experience with building RESTful APIs using Node.js and Express.js.\", \"answer\": \"I have experience with creating RESTful APIs using Node.js and Express.js. I am familiar with designing and implementing endpoints for different CRUD operations, handling request and response objects, middleware for authentication and validation, and integrating with databases. I also have experience with testing and documenting API endpoints.\"},\n{\"question\": \"How would you handle authentication and authorization in a MERN stack application?\", \"answer\": \"In a MERN stack application, authentication and authorization are typically handled using a combination of JWT (JSON Web Tokens) for authentication and role-based access control for authorization. Users would authenticate using a login form, generating a JWT upon successful login. This token is then stored in the browser's local storage or a cookie and sent with subsequent requests. Authorization is enforced by checking the user's role within the token and granting or denying access based on their permissions.\"},\n{\"question\": \"Explain your understanding of state management in React and how you would implement it in a complex application.\", \"answer\": \"State management in React involves handling data that changes over time and needs to be accessible across different components. For simple applications, React's built-in state management is sufficient. However, for complex applications with shared state, dedicated libraries like Redux or MobX are often used. These libraries provide a centralized store for managing state and ensure data consistency across the application.\"},\n{\"question\": \"Walk me through the process of deploying a MERN stack application to production.\", \"answer\": \"Deploying a MERN stack application involves several steps: 1. Build the React application into a production bundle. 2. Deploy the Node.js server to a hosting platform like Heroku or AWS. 3. Configure the server to serve the built React bundle. 4. Set up a database on the server. 5. Configure environment variables and security settings. 6. Monitor the application's performance and health.\"}\n]\n",
    "jobPosition": "Full stack web dev",
    "jobdesc": "Mern Stack",
    "jobExperience": "2",
    "createdAt": "09-10-2024",
    "createdBy": "fakeop390@gmail.com",
    "mockId": "760c6a02-c5ad-42d6-9b73-63a3294b54b3"
  },
  {
    "id": 23,
    "jsonMockResp": "[{\"question\": \"What is the difference between `useState` and `useReducer` in React?\", \"answer\": \"Both `useState` and `useReducer` are React hooks used to manage state. `useState` is simpler and suitable for managing single values or straightforward state updates. `useReducer` is more powerful for managing complex state with multiple values and intricate logic. It uses a reducer function, which takes the current state and an action as input and returns the new state.\"}, {\"question\": \"How would you handle authentication and authorization in a MERN application?\", \"answer\": \"In a MERN application, authentication can be implemented using a combination of JWT (JSON Web Tokens) and a backend API. JWTs are used to securely transmit information between the client and server. Upon successful login, the server generates a JWT containing user information and sends it back to the client. The client stores the JWT and includes it in subsequent requests to the server. Authorization can be implemented by validating the user's roles and permissions within the JWT before granting access to specific resources.\"}, {\"question\": \"Explain the concept of state management in React applications.\", \"answer\": \"State management in React refers to the process of managing and updating the data that drives the UI. As React applications become more complex, managing state within individual components can become difficult. State management solutions, such as Redux or Context API, provide centralized storage and efficient ways to manage and update state across different parts of the application, improving maintainability and data consistency.\"}, {\"question\": \"Describe your experience with MongoDB and how you would design a database schema for a social media application.\", \"answer\": \"MongoDB is a NoSQL database known for its flexibility and scalability. I have experience with MongoDB and am familiar with its document-oriented data model. For a social media application, I would design the database schema with collections for users, posts, comments, likes, and relationships. Each user document would store user information, posts would contain content and metadata, and other collections would store related data. This schema would allow for efficient querying and scaling as the application grows.\"}, {\"question\": \"How would you implement a user interface using React and Material-UI for a blog application?\", \"answer\": \"Material-UI is a popular React component library that provides a wide range of pre-built UI elements. To implement a blog application, I would utilize Material-UI components like `Grid`, `Typography`, `TextField`, and `Button` to structure the layout, display content, and provide interactive elements. I would also leverage React's state management to handle user interactions, such as form submissions and data updates. The Material-UI theming system allows for customization to create a visually appealing and cohesive user interface.\"}]\n",
    "jobPosition": "Full stack web dev",
    "jobdesc": "Mern stsack",
    "jobExperience": "2",
    "createdAt": "09-10-2024",
    "createdBy": "fakeop390@gmail.com",
    "mockId": "fcc79fc2-6499-4210-b091-d53d80c1dd01"
  }
];
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(()=>{
        user&&GetInterveiwList();
    },[user]);

    const GetInterveiwList = async()=>{
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

        // console.log("calling")
        // console.log(user);
        console.log(result);
        setInterviewList(result);
        console.log(interviewList)
    }

    return (
        <div>

            <h2 className="text-gray-300 font-medium text-xl">Previous Interveiw List</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-5 my-3">
               {interviewList && interviewList.map((item, index)=>(
                <TempComp interveiw={item} key={index}></TempComp>
               ))}
            
            </div>
        </div>
    );
}

export default InterviewList;