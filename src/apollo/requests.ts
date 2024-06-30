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
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    description
  }
}
`;
export const DELETE_PROJECT = gql`
mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId) {
    id
    name
    description
  }
}
`;
