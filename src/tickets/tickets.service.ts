import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FindTicketDto } from './dto/find-ticket-dto';

@Injectable()
export class TicketsService {
  constructor(private prisma:PrismaService){

  }
  create(createTicketDto: CreateTicketDto) { 
    const ticket = this.prisma.ticket.create({
      data: createTicketDto
    });
    return ticket;
  }

  async findAll(params: FindTicketDto) {
    const {
      page = 1,
      pageSize = 10,
    } = params;

    // สร้าง filter conditions
    const where: Prisma.TicketWhereInput = {};

    // Calculate pagination
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Execute query with count
    const [tickets, totalCount] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take
      }),
      this.prisma.ticket.count({ where })
    ]);

    // Transform dates
    const formattedTickets = tickets.map(ticket => ({
      ...ticket,
      createdAt: ticket.createdAt.toLocaleDateString('th-TH'),
      updatedAt: ticket.updatedAt.toLocaleDateString('th-TH')
    }));

    return {
      data: formattedTickets,
      page: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    };
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id }
    });
    if (ticket) {
      return {
        ...ticket,
        createdAt: ticket.createdAt.toLocaleDateString('th-TH'),
        updatedAt: ticket.updatedAt.toLocaleDateString('th-TH'),
      };
    }
    return ticket;
    
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {

    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto
    });

    return {
    ...ticket,
    createdAt: ticket.createdAt.toLocaleDateString('th-TH'),
    updatedAt: ticket.updatedAt.toLocaleDateString('th-TH'),
  };
  }

  remove(id: number) {
    const ticket = this.prisma.ticket.delete({
      where: { id }
    });
    return ticket;
  }
}
