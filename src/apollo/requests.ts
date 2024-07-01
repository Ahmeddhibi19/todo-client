import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      description
    }
  }
`;
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: ID!) {
    deleteProject(id: $deleteProjectId)
  }
`;
export const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      dueDate
      startDate
      project {
        id
      }
    }
  }
`;

export  const GET_TASKS_BY_PROJECT_ID = gql`
      query GetTasksByProjectId($projectId: Int!) {
        getTasksByProjectId(projectId: $projectId) {
          id
          title
          description
          status
          dueDate
          startDate
        }
      }
    `;

export const GET_TASK = gql`
    query GetTask($id: ID!) {
      getTask(id: $id) {
        id
        title
        description
        status
        startDate
        dueDate
        projectId
      }
    }
`;  

export const UPDATE_TASK = gql`
 mutation UpdateTask($id: ID!, $input: TaskInput!) {
            updateTask(id: $id, input: $input) {
              id
              title
              description
              status
              dueDate
              startDate
              projectId
            }
          }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($updateProjectId: ID!, $input: ProjectInput!) {
    updateProject(id: $updateProjectId, input: $input) {
      id
      name
      description
    }
  }
`;

export const GET_PROJECT = gql`
query GetProject($getProjectId: ID!) {
  getProject(id: $getProjectId) {
    id
    name
    description
  }
}
`;