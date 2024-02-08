import { useState } from "react";
import PropTypes from "prop-types";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/widgets/ui/button";
import { Calendar } from "@/widgets/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/widgets/ui/popover";

const DatePicker = ({ onChange, isMax, isMin }) => {
  const [date, setDate] = useState(new Date());
  const isDateDisabled = (selectedDate) => {
    const currentDate = new Date();

    if (isSameDay(selectedDate, currentDate)) {
      return false;
    }

    if (isMax && selectedDate > currentDate) {
      return true;
    }

    if (isMin && selectedDate < currentDate) {
      return true;
    }

    return false;
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            onChange && onChange(newDate);
          }}
          disabled={isDateDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  isMax: PropTypes.bool,
  isMin: PropTypes.bool,
  exclusiveMaxMin: function (props) {
    if (props.isMax === props.isMin) {
      return new Error("Either isMax or isMin should be true, but not both.");
    }
  },
};

export default DatePicker;
