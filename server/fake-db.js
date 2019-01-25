const Job =  require('./models/job');
const User = require("./models/user");

const Jobh =  require('./models/jobh');
const Userh = require("./models/userh");

const Jobv =  require('./models/jobv');
const Userv = require("./models/userv");

const Booking = require('./models/booking');

const fakeDbData = require('./data.json');

class FakeDb {
	constructor(){
		 this.jobs = fakeDbData.jobs;
		 this.users = fakeDbData.users;
		 
		 this.jobsh = fakeDbData.jobsh;
		 this.usersh = fakeDbData.usersh;
		 
		 this.jobsv = fakeDbData.jobsv;
             this.usersv = fakeDbData.usersv;
	}

	async cleanDb(){
		
        await User.deleteMany({});
		await Job.deleteMany({});

		await Userh.deleteMany({});
		await Jobh.deleteMany({});

		await Userv.deleteMany({});
		await Jobv.deleteMany({});
		// await Booking.deleteMany({});

	}

	pushDataToDb(){
        const user = new User(this.users[0]);
		//const user2 = new User(this.users[1]);

		this.jobs.forEach((job) => {
			const newJob = new Job(job);
                  newJob.user = user;

                  user.jobs.push(newJob);
			newJob.save();
		});

		user.save();
	
	}

	pushDataToDbh(){

		const userh = new Userh(this.usersh[0]);

		this.jobsh.forEach((jobh) => {
			const newJobh = new Jobh(jobh);
                  newJobh.userh = userh;

                  userh.jobsh.push(newJobh);
			newJobh.save();
		});


		userh.save();

	}

	pushDataToDbv(){

		const userv = new Userv(this.usersv[0]);

		this.jobsv.forEach((jobv) => {
			const newJobv = new Jobv(jobv);
                  newJobv.userv = userv;

                  userv.jobsv.push(newJobv);
			newJobv.save();
		});

		userv.save();
	
	}

	async seedDb(){
		try{
		await this.cleanDb();
		this.pushDataToDb();
		this.pushDataToDbh();
		this.pushDataToDbv();
		} catch(error){
			console.error(error);
		}
	}
}

module.exports = FakeDb;