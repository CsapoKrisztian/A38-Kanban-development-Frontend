# A38-Kanban-development-Frontend

![KanbanSync](public/board.jpg?raw=true "KanbanSync")

**KanbanSync** was made for an IRL (In Real Life) coding challenge. The [A38](https://www.a38.hu) asked us to develop a special kanban board for their **Gitlab** issues.

With KanbanSync you can retrieve, filter and manipulate your Gitlab issues. The columns of the board are the statuses of the issues. The swimlanes are optionally assignees or stories of the issues.

Our application uses **OAuth** to access the datas in Gitlab. We are using **graphQL API** to get the issues from Gitlab, and then we show them on a kanban board.

This is the frontend of the application, which is written in **React**.
The backend is a Spring application (https://github.com/CsapoKrisztian/A38-Kanban-development).

For configuration and deployment, please see the Readme file of the [backend repository](https://github.com/CsapoKrisztian/A38-Kanban-development).

## Usage

[http://a38-kanban.herokuapp.com](http://a38-kanban.herokuapp.com)

After the auto-redirecting to Gitlab authentication platform give these credentials:

e-mail: gitlab_guest@indamail.hu

password: guestPassword00


Issues can be ordered by assignee or story label. 

You have to choose at least one project. The stories and milestones of the selected projects automtically load when the project is clicked.

Selecting the stories and milestones is optional. If you don't select any of them, all issues with all stories and milestones is requested from the selected projects.

When you are ready with the settings click on the Get issues button.

An issue card looks like this:

![card](public/card.jpg?raw=true "card")

Clicking on the Gitlab logo it opens the issue on Gitlab.

You can change the status and assignee with drag and drop. The story of the issue must not change, so in story view you can not drag and drop vertically.

Story description can be a text or a link. Links are marked as this icon: ![link](public/linkicon.jpg?raw=true "link")

## Contributors:

### Developer team:

György Noémi,
Hegedüs Enikő,
Tóth Lajos Máté

### Project Management:

Csapó Krisztián,
Csürke Gábor
