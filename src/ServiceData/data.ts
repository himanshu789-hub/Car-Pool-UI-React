import UserService, { User } from "./../Service/UserService";

export let Cities: Array<string> = [
	"Mumbai",
	"Madras",
	"Delhi",
	"Amritsar",
	"Pune",
	"Chennai",
	"Raipur"
];
export let TimeInterval: Array<string> = [
	"5am - 9am",
	"9am - 12pm",
	"12pm - 3pm",
	"3pm - 6pm",
	"6pm - 9pm"
];
export const SampleUsers: Array<User> = [
	{
		id: "1",
		name: "Robert Browny Jr.",
		password: "browny123",
		emailId: "browny@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Rob.png"
	},
	{
		id: "2",
		name: "Morgan Stark",
		password: "morgan123",
		emailId: "morgan@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Mor.png"
	},
	{
		id: "3",
		name: "Tony Mark",
		password: "tony123",
		emailId: "tony@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Ton.png"
	},
	{
		id: "4",
		name: "J.P. King",
		password: "king123",
		emailId: "king@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Jpp.png"
	},
	{
		id: "5",
		name: "Jimmy Shergill",
		password: "jimmy123",
		emailId: "jimmy@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Jimmy.png"
	},
	{
		id: "6",
		name: "Sunny Arora",
		password: "sunny123",
		emailId: "sunny@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Sunny.png"
	},
	{
		id: "7",
		name: "R. Mahadavan",
		password: "rmaha123",
		emailId: "rmaha@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Rmaha.png"
	},
	{
		id: "8",
		name: "Jessica Paul",
		password: "jessica123",
		emailId: "jessica@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Jessica.png"
	},
	{
		id: "9",
		name: "Jassi Gill",
		password: "jassi123",
		emailId: "jassi@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Jassi.png"
	},
	{
		id: "10",
		name: "Jhonny Lever",
		password: "jhonney123",
		emailId: "jhonney@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Jhonney.png"
	},
	{
		id: "11",
		name: "Kabir Bedi",
		password: "kabir123",
		emailId: "kabir@gmail.com",
		active: true,
		imageUploadedPath: "/uploads/Kabir.png"
	}
];
