import { Char } from "../entities/Char";
import { Meet } from "../entities/Meet";

const charWithMeetings = (char: Char, meetings: Array<Meet>) => {
  const meetingsWithEvents = meetings.map((meet) => ({
    ...meet,
    event: meet.event,
  }));

  return {
    ...char,
    meetings: meetingsWithEvents,
  };
};

export { charWithMeetings };
