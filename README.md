# A38-Kanban-development-Frontend

## Short description
This application is a kanban board. In the board you can see, filter and manipulate your gitlab issues. The columns of the board are the statuses of the issues. The swimlanes are optionally assignees or stories of the issues.  

Our application uses OAuth to access the datas in gitlab. We use graphQL API to get the issues from gitlab, and then we show them on a kanban board. The columns of the board are the possible statuses. Horizontally there are swimlanes, which may be the assignees of the issues or the story of the issue.

This is the frontend of the application, which is written in React.
The backend is a Spring application (https://github.com/CsapoKrisztian/A38-Kanban-development).


For configuration and deployment, please see the Readme file of the backend repository.
