export function downloadCalendar() {
  const event = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Before We Leave
DESCRIPTION:Graduation Memory Invitation
LOCATION:Foreign Trade University - 91 Chua Lang, Dong Da, Hanoi
DTSTART:20260725T093000Z
DTEND:20260725T120000Z
END:VEVENT
END:VCALENDAR
`.trim();

  const blob = new Blob(
    [event],
    {
      type: "text/calendar;charset=utf-8",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "Before-We-Leave.ics";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}