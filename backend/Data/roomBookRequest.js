const bookingRequestData = [
    {
        description: "Booking for a meeting",
        startDate: new Date("2023-06-28T09:00:00Z"),
        endDate: new Date("2023-06-28T11:00:00Z"),
        bookedBy: "649a0c0da5eb6316e5eea131", // User _id
        room: "649a10356a9be11b666ddadb", // Room _id
        status: "pending",
        acceptedBy: null
    },
    {
        description: "Booking for a conference",
        startDate: new Date("2023-06-29T14:00:00Z"),
        endDate: new Date("2023-06-29T17:00:00Z"),
        bookedBy: "649a0c0da5eb6316e5eea132", // User _id
        room: "649a10356a9be11b666ddadc", // Room _id
        status: "accepted",
        acceptedBy: "649a0c0da5eb6316e5eea131" // User _id
    },
    {
        description: "Booking for a presentation",
        startDate: new Date("2023-07-01T10:00:00Z"),
        endDate: new Date("2023-07-01T12:00:00Z"),
        bookedBy: "649a0c0da5eb6316e5eea133", // User _id
        room: "649a10356a9be11b666ddadd", // Room _id
        status: "rejected",
        acceptedBy: null
    }
];

module.exports = bookingRequestData;