import { gql } from 'apollo-server';

export default gql`
  scalar Date
  scalar DateTime
  
  type Query {
    """
    List of all users
    """
    users: [User!]
    """
    The current user, authenticated by X-Forwarded-Header
    """
    me: User
    user(id:ID!):User
    """
    Finds users by username or fullname
    """
    findUsers(text:String):[User!]
    """
    List of all organizations.
    """
    organizations: [Organization!]
    organization(id:ID!):Organization
    """
    Query a meeting
    """
    meeting(id:ID!):Meeting

    """
    Query a top
    """
    top(id:ID!):Top
  }

  type Mutation {
    """
    Create an organization
    """
    createOrganization(title: String!,description:String!): Organization!
    """
    Update an organization
    """
    updateOrganization(organization:ID!,title:String!,description:String!):Organization!
    
    """
    Create a Meeting
    """
    createMeeting(organization:ID!,title:String!, description:String!,clerk:ID,moderation:ID,begin:DateTime,end:DateTime,date:Date): Meeting!

    """
    Update a Meeting
    """
    updateMeeting(meeting:ID!,title:String!, description:String!,clerk:ID,moderation:ID,begin:DateTime,end:DateTime,date:Date): Meeting!
    """
    Delete a Meeting
    """
    deleteMeeting(meeting:ID!):Boolean!

    """
    Create a Top
    """
    createTop(organization:ID!,title:String!, description:String!, submitter:ID,author:ID,submitted_at:DateTime):Top!
    """
    update Top
    """
    updateTop(top:ID!,title:String!, description:String!, submitter:ID,author:ID,submitted_at:DateTime):Top!
    
    """
    Delete a Top
    """
    deleteTop(top:ID!):Boolean!

    """
    Updates current user
    """
    updateCurrentUser(fullname:String!):User!
    """
    Upload a profile picture
    """
    uploadProfilePicture(file: Upload!): User!

    """
    Creates an action between a meeting and top.
    """
    createAction(meeting:ID!,top:ID!):Action!
    """
    Removes an Action from the system
    """
    deleteAction(action: ID!):Boolean!
  }

  type Action {
    id: ID!
    meeting: Meeting!
    top: Meeting!
    protocols: [Protocol]
  }

  type Protocol {
    id: ID!
    content:String
    result: String
    status: Int
    action: Action!
  }

  type User {
    id: ID!
    username: String!
    fullname: String
    image:String
    submitted_tops: [Top]
    authored_tops: [Top]
  }

  """
  The Organization like AK-Fest or Fachschaftsitzung
  """
  type Organization {
    id: ID!
    title: String!
    description: String!
    meetings: [Meeting]
    tops: [Top]
  }
  
  """
  A top is a discussion point
  """
  type Top {
    id:ID!
    actions: [Action]
    organization: Organization!
    submitter: User
    author: User
    submitted_at: DateTime
    title: String
    description: String
  }

  """
  A meeting usually is a formal meeting.
  """

  type Meeting {
    id:ID!
    actions: [Action]
    organization: Organization!
    clerk: User
    moderation:User
    begin: DateTime
    end: DateTime
    date: Date
    title:String!
    description: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;
