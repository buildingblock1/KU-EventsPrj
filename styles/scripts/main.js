/////////////////////
//start
/////////////////////

const database = firebase.database(
	"https://eventsku-e5a08-default-rtdb.firebaseio.com/"
);
const rootRef = database.ref(
	"https://eventsku-e5a08-default-rtdb.firebaseio.com/"
);

let userSignUp = document
	.querySelector("#user-signup button")
	.addEventListener("click", (e) => {
		e.preventDefault();

		rootRef.child(name.value).add();
	});
let userLogin = document
	.querySelector("#user-login button")
	.addEventListener("click", (e) => {
		e.preventDefault();
	});

//or for Click functions, use doSignup & doLogin

// //testing
// let user = {
// 	online: "true",
// 	password: "testuserpass890",
// 	testA: "monkey",
// 	testB: "wildcard",
// 	username: "testuser",
// };

// const uKeys = Object.keys(user);
// console.log(uKeys);
// const uValue = Object.values(user);
// const uEntries = Object.entries(user);
// console.log(uEntries);
