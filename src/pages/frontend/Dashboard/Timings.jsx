/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "@/services/useAxios";
import { Label } from "@/widgets/ui/label";
import { Skeleton } from "@/widgets/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/widgets/ui/table";
import Board from "@/components/frontend/Board/Board";
import { SLOT_DURATIONS, DAYS } from "@/services/constants";
import EditTimings from "@/components/frontend/Doctor/EditTimings";
import { LoadSpinner } from "@/components/Icons";
import { updateUserInfo } from "@/redux/actions/userActions";
import { formatTime } from "@/func/time";

function Timings() {
  const api = useAxios();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const [slotDuration, setSlotDuration] = useState(
    userInfo?.slot_duration ?? 10
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDurationChange = (e) => {
    setSlotDuration(parseInt(e));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(slotDuration);
    if (slotDuration !== userInfo?.slot_duration) {
      setIsSubmitting(true);
      api
        .put(`contexts/doctorInfo/${userInfo?.id}`, {
          slot_duration: slotDuration,
        })
        .then((response) => {
          setIsSubmitting(false);
          dispatch(updateUserInfo(response.data));
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    }
  };
  return (
    <Board>
      <div>
        <p className="font-bold text-xl mb-2 text-zinc-800">Schedule Timings</p>
        <form className="relative my-3" onSubmit={handleFormSubmit}>
          <Label>Timing Slot Duration</Label>
          {!loading ? (
            <div className="flex gap-2 my-1">
              <Select
                name="slot_duration"
                onValueChange={handleDurationChange}
                value={slotDuration}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SLOT_DURATIONS.map((duration, index) => (
                      <SelectItem key={index} value={duration.value}>
                        {duration.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <button
                disabled={isSubmitting}
                className="bg-primary text-white px-2 rounded-md text-sm w-[80px]"
              >
                {isSubmitting ? <LoadSpinner /> : "Update"}
              </button>
            </div>
          ) : (
            <div className="flex gap-2 my-1">
              <Skeleton className="w-[200px] h-10 bg-zinc-200" />
              <Skeleton className="w-[80px] h-10 bg-zinc-200" />
            </div>
          )}
        </form>
        <hr />
        {!loading ? (
          <div className="p-3">
            <p className="flex justify-between font-bold text-lg text-zinc-700 mb-2">
              Slots Timings
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>No. of Slots</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DAYS.map((day, idx) => {
                  const schedule = userInfo?.schedules?.find(
                    (schedule) => schedule.day === day
                  );
                  return (
                    <TableRow key={idx}>
                      <TableCell>{day}</TableCell>
                      <TableCell>
                        {schedule?.start_time
                          ? formatTime(schedule?.start_time)
                          : "--:--"}
                      </TableCell>
                      <TableCell>
                        {schedule?.end_time
                          ? formatTime(schedule?.end_time)
                          : "--:--"}
                      </TableCell>
                      <TableCell>{schedule?.total_slots ?? "-"}</TableCell>
                      <TableCell>
                        <EditTimings
                          schedule={schedule}
                          schedules={userInfo?.schedules}
                          day={day}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </Board>
  );
}

export default Timings;
