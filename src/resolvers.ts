import User, { UserModel } from "./models/user"
//@ts-ignore
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'
import { Context } from "./context";
import { OrganizationModel } from "./models/organization";
import { MeetingModel } from "./models/meeting";
import Top, { TopModel } from "./models/top";
import Attachment from "./models/attachment"
import fs from "fs"
let user: User = new User("henrik", "Henrik Reinstädtler")
user.id = "ID"
export default {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Query: {
    me: (parent,_,context): User => {
      return context.user
    },
    user: async (parent, { id }, context: Context) => {
      return await UserModel.findById(id)
    },
    organization: async (parent, { id }, context: Context) => {
      if (id == "") {
        return null
      }
      return await OrganizationModel.findById(id)
    },
    users: async (parent, _, context: Context) => {
      return await UserModel.find()
    },
    organizations: async () => {
      return await OrganizationModel.find()
    },
    meeting: async (parent, { id }, context: Context) => {
      return await MeetingModel.findById(id)
    },
    top: async (parent, { id }, context: Context) => {
      return await TopModel.findById(id)
    },
  },
  Mutation: {
    createOrganization: (parent, { title, description }) => {
      let organization = new OrganizationModel({ title, description })
      organization.save()
      return organization
    },
    updateOrganization: async (parent, { organization, title, description }) => {
      let m = await OrganizationModel.findOneAndUpdate({ _id: organization }, { title, description }, { new: true })
      return m
    },
    createMeeting: async (parent, { organization, title, description, clerk, moderation, begin, end, date }) => {
      let meeting = new MeetingModel({ organization: organization, title, description, clerk: clerk, moderation: moderation, begin, end, date })
      await meeting.save()
      return meeting
    },
    updateMeeting: async (parent, { meeting, title, description, clerk, moderation, begin, end, date }) => {
      let m = await MeetingModel.findOneAndUpdate({ _id: meeting }, { title, description, clerk, moderation, begin, end, date }, { new: true })
      return m
    },
    deleteMeeting: async (parent, { meeting }) => {
      let m = await MeetingModel.findByIdAndDelete(meeting)
      return true
    },
    createTop: async (parent, top_data: Top) => {
      let top = new TopModel(top_data)
      await top.save()
      return top
    },
    updateTop: async (parent, top_data) => {
      let top = top_data.top
      delete top_data.top
      let m = await TopModel.findOneAndUpdate({ _id: top }, top_data, { new: true })
      return m
    },
    deleteTop: async (parent, { top }) => {
      let m = await TopModel.findByIdAndDelete(top)
      return true
    },
    updateCurrentUser: async(parent,{fullname},context)=>{
      const {user} = await context
      return UserModel.findOneAndUpdate(user,{fullname},{new:true})
    }
    ,
    uploadProfilePicture: async (parent, { file },context) => {
      const { createReadStream, filename, mimetype } = await file
      const {user} = await context
      const stream = await createReadStream()
      return new Promise(async (resolve, reject) =>
      {
        (await Attachment).model.write({filename,contentType:mimetype}, stream, (error, file) => {
          let us = UserModel.findOneAndUpdate(user,{image:file._id},{new:true})
          
          resolve(us)
        })
      })
    }
  },
  User: {

  },
  Organization: {
    meetings: async (parent) => {
      return await MeetingModel.find({ organization: parent })
    },
    tops: async (organization) => {
      return await TopModel.find({ organization })
    }
  },
  Meeting: {
    organization: async (meeting) => {
      return await OrganizationModel.findById(meeting.organization)
    },
    clerk: async (meeting) => {
      return await UserModel.findById(meeting.clerk)
    },
    moderation: async (meeting) => {
      return await UserModel.findById(meeting.moderation)
    }
  },
  Top: {
    organization: async (top) => {
      return await OrganizationModel.findById(top.organization)
    },
    submitter: async (top) => {
      return await UserModel.findById(top.submitter)
    },
    author: async (top) => {
      return await UserModel.findById(top.author)
    }
  }
};
