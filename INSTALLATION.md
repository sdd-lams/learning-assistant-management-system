# Installation Guide

## Prerequisites

1. Have Node.js installed
2. Have Angular.js installed

## Instructions

1. First create and navigate into a directory named **learning-assistant-management-system** on your filesystem

> It doesn't matter where you place this directory

2. Initialize a local Git repository in the new directory using `git init`
3. Clone the remote repository located at https://github.com/sdd-lams/learning-assistant-management-system
4. Update your local repository from the cloned remote
5. Navigate into the **/frontend** directory and execute `npm install`
6. After the npm install completes run `ng build --build-optimizer false` from within **/frontend**
7. Navigate to the **/backend** directory and execute `npm install`

> The backend and frontend directories are located at the root level of **/learning-assistant-management-system**

8. After the npm install complete run `npm start` from within **/backend**
9. The application will now be served on **localhost:3000**
