import { Priority, Status } from "generated/prisma";

export class CreateTicketDto {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
}
