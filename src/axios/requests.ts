import { gql, useQuery,useMutation } from '@apollo/client';
export const GET_PROJECTS = gql`
  query GetProject {
    getProjects {
      id
      name
      description
    }
  }
`;
export const DELETE_PROJECT=gql`
mutation($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId)
}
`
export const CREATE_PROJECT = gql`
mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    name
    description
  }
}
`;