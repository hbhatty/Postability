### Overview

## What is Postability
Postability is a website where you can share your thoughts on anything. It's like a youtube comments clone essentially (without the video part). I created this intermediate project using Next.JS as this framework seems to be on the rise.

## What I learned
- Prisma allows us communicate with any type of database with one syntax
- Railway used to actually see our data in our tables, also connected to prisma
- Prisma used with next auth to write our data to our tables in prisma
- Adapters used to setup prisma models and work with nextjs, lets us connect our application to whatever db or backend to store information
- Providers are just services that can be used with nextauth, for example google
- Interfaces in react, is used to define certain objects
- TanStack Query allows us to fetch data and update server state easily, kind of like Axios
    - Axios and TanStack are usually used in conjuction
    - Axios is mainly used for making HTTP reqs, while react/tanstack query is to manage and cache data
- react query does cahcing for us
- When adding relations between tables you have to include the name of the table referencing the one that we want with an array
- When we need to delete a specific table, if we have a table relation, we must do onDelete: Cascade for no errors


## Technologies/Languages Used
- Prisma
- Typescript
- PostgreSQL
- Next Auth
- TanStack
- Axios
- React hot-toast

# Problems
- const title: string Argument of type 'string' is not assignable to parameter of type 'void'
 - I'm thinking this has to do something with the fact that our mutate const is only called when the submit button is pressed, resulting in it to be void initally
 - Fixed by adding a type for the async of the title
