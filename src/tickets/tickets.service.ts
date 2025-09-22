import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';


@Injectable()
export class TicketsService {
  constructor(private prisma:PrismaService){

  }
  create(data: Prisma.TicketCreateInput) { 
    const ticket = this.prisma.ticket.create({
      data
    });
    return ticket;
  }

  async findAll() {
    const tickets = await this.prisma.ticket.findMany();
    return tickets.map(ticket => ({
    ...ticket,
    createdAt: ticket.createdAt.toLocaleDateString('th-TH'),
    updatedAt: ticket.updatedAt.toLocaleDateString('th-TH'),
  }));
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
  
  update(id: number, updateTicketDto: Prisma.TicketUpdateInput) {
    const ticket = this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto
    });
    return ticket;
  }

  remove(id: number) {
    const ticket = this.prisma.ticket.delete({
      where: { id }
    });
    return ticket;
  }
}
