import React from "react";
import { useParams } from "react-router";
import { API_KEY, API_URL } from "../constants";
import UserDetail from "../components/UserDetail";
import UserDetailPlaceholder from "../components/UserDetailPlaceholder";
import { useEffect } from "react";
import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";
import Card from "../components/Card";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { Globe } from "lucide-react";
import { Calendar } from "lucide-react";
import { dateFormat, minutesWording } from "../utils/dateTimeFormat";
import { Briefcase } from "lucide-react";
import { DollarSign } from "lucide-react";
import { DoorOpen } from "lucide-react";
import { Timer } from "lucide-react";
import { CheckCheck } from "lucide-react";

function DetailPage() {
  const { id } = useParams();
  const { userDetail, getUserById, loading } = useContext(UsersContext);

  useEffect(() => {
    getUserById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading.getUserById) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
      <Card className="flex-1 border border-gray-200 p-5  overflow-clip lg:sticky lg:top-19 relative">
        <div className="bg-sky-600 w-full h-30 absolute top-0 left-0"></div>
        <div className="relative z-10 mt-12">
          <img
            src={userDetail.avatar}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full"
          />
          <h2 className="font-medium text-lg mt-1">
            {userDetail.first_name} {userDetail.last_name}
          </h2>
          <p className="text-xs bg-gray-100 px-3 py-1 rounded-full my-1 inline-block">
            {userDetail.role}
          </p>

          <div>
            <h3 className=" mt-6">Basic Information</h3>

            <div className="flex gap-3 mt-4 items-start">
              <span className="p-2 rounded-full bg-gray-100">
                <Phone className="size-4" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Mobile Phone</p>
                <p className="text-sm">{userDetail.phone}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 items-start">
              <span className="p-2 rounded-full bg-gray-100">
                <Mail className="size-4" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm">{userDetail.email}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 items-start">
              <span className="p-2 rounded-full bg-gray-100">
                <Globe className="size-4" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Nationality</p>
                <p className="text-sm">{userDetail.nationality}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 items-start">
              <span className="p-2 rounded-full bg-gray-100">
                <Calendar className="size-4" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Date of Birth</p>
                <p className="text-sm">{dateFormat(userDetail.dob)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex-2 flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <Card className=" border border-gray-200 overflow-clip flex-1">
            <div className="bg-sky-50 px-3 py-1 flex gap-3 items-center">
              <span className="p-2 rounded-full bg-green-50">
                <DollarSign className="size-4 text-green-500" />
              </span>
              <p className="text-sm font-medium">Salary</p>
            </div>
            <div className="p-5">
              <p className="text-sm">${userDetail.salary_per_month}/month</p>
            </div>
          </Card>
          <Card className=" border border-gray-200 overflow-clip flex-1">
            <div className="bg-sky-50 px-3 py-1 flex gap-3 items-center">
              <span className="p-2 rounded-full bg-indigo-50">
                <DoorOpen className="size-4 text-indigo-500" />
              </span>
              <p className="text-sm font-medium">Paid Leave Remaining</p>
            </div>
            <div className="p-5">
              <p className="text-sm">{userDetail.paid_leave_remaining}</p>
            </div>
          </Card>
        </div>
        <Card className=" border border-gray-200 overflow-clip flex-1">
          <div className="bg-sky-50 px-3 py-1 flex gap-3 items-center">
            <span className="p-2 rounded-full bg-amber-50">
              <Briefcase className="size-4 text-amber-500" />
            </span>
            <p className="text-sm font-medium">Work Information</p>
          </div>
          <div className="p-5 text-sm flex flex-col gap-3">
            <div className="grid grid-cols-2">
              <p className="font-light">Join Date</p>
              <p>{dateFormat(userDetail.join_date)}</p>
            </div>
            <hr className="text-gray-200" />
            <div className="grid grid-cols-2">
              <p className="font-light">Employment Type</p>
              <p>{userDetail.employment_type}</p>
            </div>
            <hr className="text-gray-200" />
            <div className="grid grid-cols-2">
              <p className="font-light">Working Hours</p>
              <p>
                {userDetail.working_start}-{userDetail.working_end}
              </p>
            </div>
            <hr className="text-gray-200" />
            <div className="grid grid-cols-2">
              <p className="font-light">Supervisor Name</p>
              <p>{userDetail.supervisor_name}</p>
            </div>
          </div>
        </Card>
        <Card className=" border border-gray-200 overflow-clip flex-1">
          <div className="bg-sky-50 px-3 py-1 flex gap-3 items-center">
            <span className="p-2 rounded-full bg-fuchsia-50">
              <Timer className="size-4 text-fuchsia-500" />
            </span>
            <p className="text-sm font-medium">Recent Activity</p>
          </div>
          <div className="p-5 text-sm">
            <p>Total worked time today</p>
            <p className="mt-1">
              {minutesWording(userDetail.today_worked).hours}{" "}
              <span className="text-xs">hours</span>{" "}
              {minutesWording(userDetail.today_worked).minutesLeft}{" "}
              <span className="text-xs">minutes</span>
            </p>

            <div className="flex gap-2 mt-4">
              <div
                className={`h-4  bg-sky-400 rounded`}
                style={{ width: `${userDetail.today_active_time}%` }}
              ></div>
              <div
                className={`h-4  bg-amber-400 rounded`}
                style={{ width: `${100 - userDetail.today_active_time}%` }}
              ></div>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 rounded-full bg-sky-400"></div>
                <p className="text-xs">Active Time</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                <p className="text-xs">Idle Time</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className=" border border-gray-200 overflow-clip flex-1">
          <div className="bg-sky-50 px-3 py-1 flex gap-3 items-center">
            <span className="p-2 rounded-full bg-rose-50">
              <CheckCheck className="size-4 text-rose-500" />
            </span>
            <p className="text-sm font-medium">Project Completion</p>
          </div>
          <div className="p-5 text-sm">
            <p>Total projects completed</p>
            <p className="mt-1">
              {userDetail.project_completed}{" "}
              <span className="text-xs">projects</span>
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {userDetail.projects &&
                userDetail.projects.map((project, index) => {
                  return (
                    <div className="" key={index}>
                      <div className="flex justify-between items-center">
                        <p className="text-xs">{project.name}</p>
                        <p>{project.progress}%</p>
                      </div>

                      <div className="h-4 bg-gray-200 w-full rounded overflow-clip mt-1">
                        <div
                          className="h-4 bg-purple-500 rounded"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DetailPage;
