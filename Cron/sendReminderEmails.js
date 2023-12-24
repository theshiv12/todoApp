const Task = require("../Task/task.model");
const sendEmail = require("../shared/sendEmail")
const Queue = require('bull');
const reminderQueue = new Queue('reminderQueue', {
  redis: {
    host: process.env.REDISURI,
    port: process.env.REDISPORT,
  },
});

exports.scheduleTaskReminders = async () => {
  console.log("***********Reminder called at***********", new Date().getHours())
  try {
    const twentyFourHoursFromNow = new Date();
    twentyFourHoursFromNow.setDate(twentyFourHoursFromNow.getDate() + 1);

    const upcomingTasks = await Task.find({
      dueDate: {
        $gte: new Date(),
        $lt: twentyFourHoursFromNow
      },
      status: "pending"
    }).populate("user");
    upcomingTasks.forEach(async (task) => {
      await reminderQueue.add('sendReminderEmail', { userEmail: task.user.email, taskTitle: task.title });
      console.log(`Reminder added in queue: ${task.title}`);
    });
  } catch (error) {
    console.error('Error scheduling reminders:', error);
  }
}

//Here now i did not write logic to retry mechanism, but we can do later .
reminderQueue.process('sendReminderEmail', async (job) => {
  const { userEmail, taskTitle } = job.data;
  const mailOptions = {
    from: process.env.SMTPLogin,
    to: userEmail,
    subject: 'Reminder: Task Due Soon',
    text: `Hello,\n\nThis is a reminder that your task ${taskTitle} is due within the next 24 hours.\nPlease take necessary action.\n\nThank you.`,
  };
  await sendEmail.send(mailOptions)
  console.log("Sent reminder email Successfully");
});

reminderQueue.on('completed', (job) => {
  console.log(`Email sent successfully to: ${job.data.userEmail}`);
});