A user and a community are the two root fundamental entities. Every functionality in the application would have these two entities as their base in some shape and form.

A user can be created either by pre-existing(created at application startup time) or by signing up. A user doesn't need to be a part of an existing community to exist. For now the user can have two roles namely `BASE` and `ADMINISTRATOR`.

The `BASE` role gives the least amount of privileges to the user. This role is granted by default to all the users who sign up to the application.

The `ADMINISTRATOR` role gives the most amount of privileges to the user. This role is only granted to users that are either created at the application startup time or users who are elevated to this role by other users who already have this role.

A community could be created at either the application startup time or at runtime. Only the users with `ADMINISTRATOR` role can create communities.

A user can become a member of many communities. A community can have many users as members. This is a many-to-many relationship and in relational databases this is expressed using junction tables. In such a junction table each record contains a unique combination of a `member_id` and `community_id` which makes maps a user to a community and also makes sure that a user can only become member of a community once. For now a community member can have two roles namely `BASE` and `MODERATOR` within that community.

The `BASE` role gives the least amount of privileges to a community member. This role is granted by default to all the users who become a member of the community.

The `MODERATOR` role gives the most amount of privileges to a community member within that community. This role is only granted to members that are assigned this role to them at the application startup time or members who have their role elevated by administrators. Whether a moderator can elevate other community members to be a moderator is to be decided.

These concepts are similar to how discord and reddit operate. A user can sign up to discord/reddit without ever joining a single community. After that they could search for public discord/reddit servers/communities and join them. The difference here would be that normal users aren't allowed to create servers/communities unlike discord/reddit, they can only join servers/communities that have already been created by users with `ADMINISTRATOR` role.

Questions:-

The creators of a community are the administrators but normal users are assigned to be moderators in the community. It should be discussed what exactly concerning a community can the moderators create, update or delete.

What is an `ActionItem`
Pending, a task for members of an organization, could also be used for events

What is an `ActionItemCategory`
Pending, categories within an action item

`Advertisement`
Pending

What is an `AgendaCategory`
Pending

What is an `AgendaItem`
Pending, agenda for an event

What is an `AgendaSection`
Pending

`AppUserProfile`
Remove in the future

`CheckIn`
Pending, used for attendance of the event attendees

`CheckOut`
Pending, used for attendance of the event attendees

`Comment`
Done

`DirectChat`
Pending

`DirectChatMessage`
Pending

`Donation`
Pending

`EncodedImage`
Remove in the future, currently used to upload images

`EncodedVideo`
Remove in the future, currently used to upload videos

`Event`
Pending

Breeze chm has the concept of calendars where a community can have many calendars and each calendar could have many events. Talawa implementation consists of no calendars, so by default a single calendar is used for all events within a community.

`EventAttendee`
Pending

`EventVolunteer`
Pending

`EventVolunteerGroup`
Pending

`Feedback`
Remove

`File`
Remove

`Fund`
Done

`FundraisingCampaign`
Done

`FundraisingCampaignPledge`
Done

Few design changes after confirmation from mentors:-

I went through the breeze chm's implementation of Funds, Campaigns and Pledges. Here are a few differences in implementations between Breeze ChM and talawa:-
In breeze chm a fund can be associated to many campaigns and a campaign can be associated to zero or more funds. In breeze chm, the relation of a fund and a campaign is only in making it easier during the creation of a campaign if no default fund is selected we get Any as the fund which basically means no specific fund, if a single default fund is selected In talawa a fund can have many campaigns associated to it but a campaign can only have one fund associated to it. Is this intentional? Do we deviate from breeze chm's implementation in this aspect?

In breeze chm a campaign can be associated to many pledges and a pledge can be associated to any one campaign. In talawa a campaign can have many pledges associated to it and a pledge can have many campaigns associated to it. Is this intentional? Do we deviate from breeze chm's implementation in this aspect?

if multiple community members regardless of them being affiliated to a common family can be committed to a single pledge, create a junction table between a pledge and community members, on that junction table have a column `is_include_family: boolean` to indicate whether the pledge should be affiliated to family members of a pledger, one thing to take care of here would be making sure that two different rows in this junction table don't contain members who belong to the same family as that requirement is already taken care of using `is_include_family: boolean`

if only a single community member can commit to a single pledge, include both the community member id and a column `is_include_family:boolean` on the pledge table to indicate whether the pledge should be affiliated to family members of a pledger

`Group`

Remove

`GroupChat`

Remove

`GroupChatMessage`

Remove

`ImageHash`

Remove in the future, currently used to prevent deduplication of images

`Language`
Remove

`MembershipRequest`
Done

`Message`
Remove

`MessageChat`
Remove

`Note`
Pending

`Organization`
Pending, custom fields per community, probably useless feature

`OrganizationCustomField`
Remove

`OrganizationTagUser`
Done

`Plugin`
Remove in the future, currently used to toggle chats/donations/events/posts

`PluginField`
Remove in the future, currently used to toggle chats/donations/events/posts

`Post`
Done

`RecurrenceRule`
Pending

`SampleData`
Should be removed.

`TagUser`
Done

`User`
Pending, custom member fields per community, probably useless feature

`UserCustomData`
Remove

`UserFamily`
Done

`Venue`
Done

=======================================

`ActionItemCategory` -> `action_categories`

Breeze chm doesn't have an equivalent functionality.

`ActionItem` -> `actions`

Breeze chm doesn't have an equivalent functionality.

`Advertisement` -> `advertisements`

Done

`AgendaCategory` -> `agenda_categories`

Remove(as discussed on slack thread for the same)

`AgendaItem` -> `agenda_items`

Pending

Providing clients the ability to create agenda items with any number of fields of text type is dumb. How exactly would those fields map to the user interface?

The relative positions of agenda items that are not assigned to any section and when they are assigned to some section work differently, the unique position constraint should be defined accordingly.

Either no agenda section should exist or no agenda item without being assigned to an agenda section should exist. Without this constraint relative positioning of section unassociated agenda items and agenda sections would become hard to implement as it would have to be done across two tables.

`AgendaSection` -> `agenda_sections`

Done

`AppUserProfile`

Remove(as discussed in the google meet conference)

`CheckIn`

Pending

Has to be done on an instance basis where instance could be regular or a recurring instance of an event.

`CheckOut`

Pending

Has to be done on an instance basis where instance could be regular or a recurring instance of an event.

`Comment` -> `comments`

Done

`DirectChat`

Pending(depends on another GSOC contributer's work)

`DirectChatMessage`

Pending(depends on another GSOC contributer's work)

`Donation`

Remove

`EncodedImage`

Remove(depends on another GSOC contributer's work)

`EncodedVideo`

Remove(depends on another GSOC contributer's work)

`Event` -> `events`

Pending

`EventAttendee` -> `event_registrations`

Pending

The implementation of inviting/registering users to events as attendees seems incomplete/wrong. Confirm with mentors.

For a user to be invited to an event, `invite_status` field should be non-null.

For a user to be directly registered

`EventVolunteer` -> `volunteer_group_assignments`

Done

The number of volunteer group assignments for a particular volunteer group should be smaller than or equal to the `maxVolunteerCount` field of the volunteer group.

When a user is invited to be a volunteer, `isInvitee` field will be true, `status` field will be non-null and `isAssignee` field will be false.

When a user is assigned to be a volunteer, `isInvitee` field will be false, `status` field will be null and `isAssignee` field will be true.

`EventVolunteerGroup` -> `volunteer_groups`

Done

`Feedback`

Remove(as discussed in the google meet conference)

`File`

Remove(not used anywhere in the codebase)

`Fund` -> `funds`

Done

`FundraisingCampaign` -> `fundraising_campaigns`

Done

`FundraisingCampaignPledge` -> `pledges`

Done

`Group`

Remove(not used anywhere in the codebase)

`GroupChat`

Remove(not used anywhere on the client side)

`GroupChatMessage`

Remove(not used anywhere on the client side)

`ImageHash`

Remove(depends on another GSOC contributer's work)

`Language`

Remove(as discussed in the google meet conference)

`MembershipRequest` -> `organization_memberships`

Done

`Message`

Remove(not used anywhere on the client side)

`MessageChat`

Remove(not used anywhere on the client side)

`Note`

Remove(as discussed on slack thread for agenda items)

`Organization` -> `organizations`

Done

`OrganizationCustomField`

Remove(useless)

`OrganizationTagUser` -> `tags`

Done

`Plugin`

Remove(useless as discussed on the slack thread for plugins)

`PluginField`

Remove(useless as discussed on the slack thread for plugins)

`Post` -> `posts`

Done

`RecurrenceRule` -> `event_recurrences`

Pending

`SampleData`

Remove(useless)

`TagUser` -> `tag_assignments`

Done

`User` -> `users`

Done

`UserCustomData`

Remove(useless)

`UserFamily` -> `families`

Done

`family_memberships`

Done

It should be discussed if a family member should be allowed to change their role on the family they've been assigned to.

`Venue` -> `venues`

Done

What does storing capacity of a venue accomplish? It is not being used to limit the number of attendees of an event which should be its primary purpose.

`venue_attachments`

Done

`venue_bookings`

Done

When making venue bookings for an event it should be made sure that the venue isn't already booked for some other event for the same timespan.
