const Job =  require('./models/job');
const User = require("./models/user");
const Booking = require('./models/booking');

const fakeDbData = require('./data.json');

class FakeDb {
	constructor(){
		this.jobs = fakeDbData.jobs;
            this.users = fakeDbData.users;
	}

	async cleanDb(){
            await User.deleteMany({});
		await Job.deleteMany({});
            await Booking.deleteMany({});
	}

	pushDataToDb(){
            const user = new User(this.users[0]);
            const user2 = new User(this.users[1]);

		this.jobs.forEach((job) => {
			const newJob = new Job(job);
                  newJob.user = user;

                  user.jobs.push(newJob);
			newJob.save();
		});

            user.save();
            user2.save();
	}

	async seedDb(){
		await this.cleanDb();
		this.pushDataToDb();
	}
}

module.exports = FakeDb;