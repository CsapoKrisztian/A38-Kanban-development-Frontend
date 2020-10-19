# A38-Kanban-development-Frontend

# A38-Kanban-development-Frontend

This project was ordered by A38 ship. Their development team uses gitLab. They wanted to see and manipulate their issues on a kanban board, but with more functionality than the one that gitLab provides.

Our application uses OAuth to access the datas in gitlab. We use graphQL API to get the issues from gitlab, and then we show them on a kanban board. The columns of the board are the possible statuses. Horizontally there are swimlanes, which may be the assignees of the issues or the story of the issue.

This is the frontend of the application, which is written in React.
The backend is a Spring application (https://github.com/CsapoKrisztian/A38-Kanban-development).


For configuration and deployment, please see the Readme file of the backend repository.
