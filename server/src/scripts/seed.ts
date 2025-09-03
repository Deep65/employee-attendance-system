import 'dotenv/config';
import { connectDB } from '@config/db';
import User from '@models/user.model';
import Leave from '@models/leave.model';
import Attendance from '@models/attendance.model';
import { UserRole } from 'enums/user-role.enum';
import { LeaveType, LeaveStatus } from 'enums/leaves.enum';

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Leave.deleteMany({});
    await Attendance.deleteMany({});

    console.log('Cleared existing data');

    const admin = new User({
      name: 'Admin User',
      email: 'admin@company.com',
      password: 'admin123',
      role: UserRole.ADMIN,
      leaveBalance: 25,
    });
    await admin.save();
    console.log('👑 Created admin user');

    const employees = [
      {
        name: 'John Doe',
        email: 'john.doe@company.com',
        password: 'employee123',
        role: UserRole.EMPLOYEE,
        leaveBalance: 20,
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        password: 'employee123',
        role: UserRole.EMPLOYEE,
        leaveBalance: 18,
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        password: 'employee123',
        role: UserRole.EMPLOYEE,
        leaveBalance: 22,
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        password: 'employee123',
        role: UserRole.EMPLOYEE,
        leaveBalance: 15,
      },
      {
        name: 'David Brown',
        email: 'david.brown@company.com',
        password: 'employee123',
        role: UserRole.EMPLOYEE,
        leaveBalance: 20,
      },
    ];

    const createdEmployees = [];
    for (const employeeData of employees) {
      const employee = new User(employeeData);
      await employee.save();
      createdEmployees.push(employee);
      console.log(`👤 Created employee: ${employeeData.name}`);
    }

    const leaveRequests = [
      {
        employee: createdEmployees[0]._id,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-02-16'),
        leaveType: LeaveType.VACATION,
        reason: 'Family vacation',
        status: LeaveStatus.PENDING,
      },
      {
        employee: createdEmployees[1]._id,
        startDate: new Date('2024-02-20'),
        endDate: new Date('2024-02-20'),
        leaveType: LeaveType.SICK,
        reason: 'Doctor appointment',
        status: LeaveStatus.APPROVED,
        approvedBy: admin._id,
        approvedAt: new Date(),
      },
      {
        employee: createdEmployees[2]._id,
        startDate: new Date('2024-02-25'),
        endDate: new Date('2024-02-27'),
        leaveType: LeaveType.WORK_FROM_HOME,
        reason: 'Remote work',
        status: LeaveStatus.APPROVED,
        approvedBy: admin._id,
        approvedAt: new Date(),
      },
    ];

    for (const leaveData of leaveRequests) {
      const leave = new Leave(leaveData);
      await leave.save();
      console.log(`📅 Created leave request for ${leaveData.employee}`);
    }

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    for (let i = 0; i < 10; i++) {
      const date = new Date(startOfMonth);
      date.setDate(date.getDate() + i);

      if (date.getDay() === 0 || date.getDay() === 6) continue;

      for (const employee of createdEmployees.slice(0, 3)) {
        const checkIn = new Date(date);
        checkIn.setHours(9, Math.floor(Math.random() * 30), 0, 0);

        const checkOut = new Date(date);
        checkOut.setHours(17, Math.floor(Math.random() * 60), 0, 0);

        const attendance = new Attendance({
          employee: employee._id,
          date: date,
          checkIn: checkIn,
          checkOut: checkOut,
          isPresent: true,
        });

        await attendance.save();
      }
    }

    console.log(' Created attendance records');

    console.log(' Seed data created successfully!');
    console.log(' Test Credentials:');
    console.log('Admin: admin@company.com / admin123');
    console.log('Employee: john.doe@company.com / employee123');
    console.log('Employee: jane.smith@company.com / employee123');

    process.exit(0);
  } catch (error) {
    console.error(' Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
