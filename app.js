///copied from RoutingSammy-09-21, must customize for events
const app = Sammy("#main", function () {
	this.use("Handlebars", "hbs");
	/*
	==>> hard code here
	let userId = "-xxxx";
	let username = "userX";
	this.use("Hanhelbars", "hbs");
	*/

	// Home -index
	this.get("#/index", function (context) {
		context
			.loadPartials({
				header: "./views/header.hbs",
				footer: "./views/footer.hbs",
			})
			.then(function () {
				this.partial("./views/index.hbs", function (details) {
					console.log("Went To index!!");
				});
			});
	});

	this.get("#/login", function (context) {
		//get the login page
		console.log("went to login!!");
		context
			.loadPartials({
				header: "./views/header.hbs",
				footer: "./views/footer.hbs",
			})
			.then(function () {
				this.partial("./views/login.hbs", function (details) {
					console.log("went to login form!!");
				});
			});
		console.log("went to line38!!");
	});
	console.log("went to line40!!");

	this.post("#/login", function (context) {
		//pulls in the login post information
		//then validates if the user can log in or not
		//if successful redirect to the profile page
		let username = this.params.username;
		let password = this.params.password;
		console.log("hi");

		fetch("https://eventsku-e5a08-default-rtdb.firebaseio.com/users.json")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((users) => {
				let userArray = Object.entries(users);
				console.log(users);
				let hasUser = userArray.find((user) => {
					let [userID, userObj] = user;
					return userObj.username == username;
				});

				if (hasUser != undefined) {
					//check the password
					document
						.getElementById("password")
						.classList.remove("is-invalid");
					if (hasUser[1].password == password) {
						//logged In!!!!
						user = hasUser[0];
						context.redirect("#/homepage");
					} else {
						document
							.getElementById("password")
							.classList.add("is-invalid");
					}
				} else {
					//send error to the front end
					document
						.getElementById("username")
						.classList.add("is-invalid");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	console.log("went to line89!!");

	//user Homepage
	this.get("#/homepage", function (context) {
		context
			.loadPartials({
				header: "./views/header.hbs",
				footer: "./views/footer.hbs",
			})
			.then(function () {
				this.partial("./views/homepage.hbs", function (details) {
					console.log("went to hompage!!");
				});
			});
	});

	//register
	this.get("#/register", function (context) {
		//get the login page
		context
			.loadPartials({
				header: "./views/header.hbs",
			})
			.then(function () {
				this.partial("./views/register.hbs", function (details) {
					console.log("went to register!!");
				});
			});
	});
	this.post("#/register", function (context) {
		//pulls in the register post information
		//then validates if the user can create an account or not
		//if successful redirect to the home page || loginpage
		let username = this.params.username;
		let password = this.params.password;

		fetch("https://eventsku-e5a08-default-rtdb.firebaseio.com/users.json")
			.then((response) => {
				return response.json();
			})
			.then((users) => {
				let userArray = Object.entries(users);
				console.log(users);
				let hasUser = userArray.find((user) => {
					let [userID, userObj] = user;
					return userObj.username == username;
				});

				if (hasUser == undefined) {
					//add the new user
					let url =
						"https://eventsku-e5a08-default-rtdb.firebaseio.com/events.json";
					let headers = {
						method: "POST", // *GET, POST, PUT, DELETE, etc.
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username,
							password,
						}),
					};
					fetch(url, headers).then((response) => {
						if (response.status == 200) {
							context.redirect("#/login");
						}
					});
				} else {
					//send error to the front end
					document
						.getElementById("username")
						.classList.add("is-invalid");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
	//logout
	this.get("#/logout", function (context) {
		user = "";
		context.redirect("#/index");
	});
});

(() => {
	app.run("#/index");
})();
