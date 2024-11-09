// THE ENUMS STORED HERE ARE ONLY ENFORCED AT THE API LEVEL. THESE ARE NOT DATABASE ENUMS.

import { z } from "zod";

/**
 * Possible variants of the type of attachements of an advertisement.
 */
export const advertisementAttachmentTypeEnum = z.enum(["image", "video"]);

/**
 * Possible variants of the type of an advertisement.
 */
export const advertisementTypeEnum = z.enum(["banner", "menu", "pop_up"]);

/**
 * Possible variants of the type of an agenda item.
 */
export const agendaItemTypeEnum = z.enum([
	"general",
	"note",
	"scripture",
	"song",
]);

/**
 * Possible variants of the type of votes on a comment.
 */
export const commmentVoteTypeEnum = z.enum(["down_vote", "up_vote"]);

/**
 * Possible variants of the type of attachements of an event.
 */
export const eventAttachmentTypeEnum = z.enum(["image", "video"]);

/**
 * Possible variants for status of a user's registration as an attendee to an event.
 */
export const eventAttendeeRegistrationInviteStatusEnum = z.enum([
	"accepted",
	"declined",
	"no_response",
]);

/**
 * Possible variants of role in the family(if applicable) of a user.
 */
export const familyMembershipRoleEnum = z.enum([
	"adult",
	"child",
	"head_of_household",
	"spouse",
]);

/**
 * Possible variants of the role assigned to an organization member.
 */
export const organizationMembershipRole = z.enum(["administrator", "base"]);

/**
 * Possible variants of the type of attachements of a post.
 */
export const postAttachmentTypeEnum = z.enum(["image", "video"]);

/**
 * Possible variants of the type of votes on a post.
 */
export const postVoteTypeEnum = z.enum(["down_vote", "up_vote"]);

/**
 * Possible variants of type of recurrence of an event.
 */
export const recurrenceTypeEnum = z.enum([
	"daily",
	"monthly",
	"weekly",
	"yearly",
]);

/**
 * Possible variants of education grade(if applicable) of a user.
 */
export const userEducationGradeEnum = z.enum([
	"grade_1",
	"grade_2",
	"grade_3",
	"grade_4",
	"grade_5",
	"grade_6",
	"grade_7",
	"grade_8",
	"grade_9",
	"grade_10",
	"grade_11",
	"grade_12",
	"graduate",
	"kg",
	"no_grade",
	"pre_kg",
]);

/**
 * Possible variants of the employment status(if applicable) of a user.
 */
export const userEmploymentStatusEnum = z.enum([
	"full_time",
	"part_time",
	"unemployed",
]);

/**
 * Possible variants of the martial status(if applicable) of a user.
 */
export const userMaritalStatusEnum = z.enum([
	"divorced",
	"engaged",
	"married",
	"seperated",
	"single",
	"widowed",
]);

/**
 * Possible variants of the sex assigned to a user at birth.
 */
export const userNatalSexEnum = z.enum(["female", "intersex", "male"]);

/**
 * Possible variants of the role assigned to a user.
 */
export const userRole = z.enum(["administrator", "base"]);

/**
 * Possible variants of the type of attachements of an event venue.
 */
export const venueAttachmentTypeEnum = z.enum(["image", "video"]);

/**
 * Possible variants of status of assignment of a user an event's volunteer group.
 */
export const volunteerGroupAssignmentInviteStatusEnum = z.enum([
	"accepted",
	"declined",
	"no_response",
]);

/**
 * Possible variants of the two-letter country code defined in ISO 3166-1, part of the ISO 3166 standard published by the International Organization for Standardization (ISO), to represent countries, dependent territories, and special areas of geographical interest. More information at this link: {@link https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes}
 */
export const iso3166Alpha2CountryCodeEnum = z.enum([
	"ad",
	"ae",
	"af",
	"ag",
	"ai",
	"al",
	"am",
	"ao",
	"aq",
	"ar",
	"as",
	"at",
	"au",
	"aw",
	"ax",
	"az",
	"ba",
	"bb",
	"bd",
	"be",
	"bf",
	"bg",
	"bh",
	"bi",
	"bj",
	"bl",
	"bm",
	"bn",
	"bo",
	"bq",
	"br",
	"bs",
	"bt",
	"bv",
	"bw",
	"by",
	"bz",
	"ca",
	"cc",
	"cd",
	"cf",
	"cg",
	"ch",
	"ci",
	"ck",
	"cl",
	"cm",
	"cn",
	"co",
	"cr",
	"cu",
	"cv",
	"cw",
	"cx",
	"cy",
	"cz",
	"de",
	"dj",
	"dk",
	"dm",
	"do",
	"dz",
	"ec",
	"ee",
	"eg",
	"eh",
	"er",
	"es",
	"et",
	"fi",
	"fj",
	"fk",
	"fm",
	"fo",
	"fr",
	"ga",
	"gb",
	"gd",
	"ge",
	"gf",
	"gg",
	"gh",
	"gi",
	"gl",
	"gm",
	"gn",
	"gp",
	"gq",
	"gr",
	"gs",
	"gt",
	"gu",
	"gw",
	"gy",
	"hk",
	"hm",
	"hn",
	"hr",
	"ht",
	"hu",
	"id",
	"ie",
	"il",
	"im",
	"in",
	"io",
	"iq",
	"ir",
	"is",
	"it",
	"je",
	"jm",
	"jo",
	"jp",
	"ke",
	"kg",
	"kh",
	"ki",
	"km",
	"kn",
	"kp",
	"kr",
	"kw",
	"ky",
	"kz",
	"la",
	"lb",
	"lc",
	"li",
	"lk",
	"lr",
	"ls",
	"lt",
	"lu",
	"lv",
	"ly",
	"ma",
	"mc",
	"md",
	"me",
	"mf",
	"mg",
	"mh",
	"mk",
	"ml",
	"mm",
	"mn",
	"mo",
	"mp",
	"mq",
	"mr",
	"ms",
	"mt",
	"mu",
	"mv",
	"mw",
	"mx",
	"my",
	"mz",
	"na",
	"nc",
	"ne",
	"nf",
	"ng",
	"ni",
	"nl",
	"no",
	"np",
	"nr",
	"nu",
	"nz",
	"om",
	"pa",
	"pe",
	"pf",
	"pg",
	"ph",
	"pk",
	"pl",
	"pm",
	"pn",
	"pr",
	"ps",
	"pt",
	"pw",
	"py",
	"qa",
	"re",
	"ro",
	"rs",
	"ru",
	"rw",
	"sa",
	"sb",
	"sc",
	"sd",
	"se",
	"sg",
	"sh",
	"si",
	"sj",
	"sk",
	"sl",
	"sm",
	"sn",
	"so",
	"sr",
	"ss",
	"st",
	"sv",
	"sx",
	"sy",
	"sz",
	"tc",
	"td",
	"tf",
	"tg",
	"th",
	"tj",
	"tk",
	"tl",
	"tm",
	"tn",
	"to",
	"tr",
	"tt",
	"tv",
	"tw",
	"tz",
	"ua",
	"ug",
	"um",
	"us",
	"uy",
	"uz",
	"va",
	"vc",
	"ve",
	"vg",
	"vi",
	"vn",
	"vu",
	"wf",
	"ws",
	"ye",
	"yt",
	"za",
	"zm",
	"zw",
]);
