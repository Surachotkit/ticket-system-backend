import { Priority, Status } from "generated/prisma";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export class CreateTicketDto {

    @IsString()
    @MinLength(5, { message: 'Title must be at least 5 characters long' })
    title: string;

    @IsString()
    @MaxLength(5000, { message: 'Description cannot exceed 5000 characters' })
    description: string;

    @IsEnum(TicketPriority, { message: 'Priority must be LOW, MEDIUM or HIGH' })
    priority: TicketPriority;

    @IsEnum(TicketStatus, { message: 'Status must be OPEN, IN_PROGRESS or RESOLVED' })
    status: TicketStatus;
}
