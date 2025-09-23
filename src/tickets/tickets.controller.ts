import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FindTicketDto } from './dto/find-ticket-dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body(ValidationPipe) createTicketDto: CreateTicketDto) {
    try {
      return await this.ticketsService.create(createTicketDto);
    } catch (error) {
       console.error('Create ticket error:', error);
      throw new HttpException('Failed to create ticket', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
    async findAll(@Query(new ValidationPipe({ transform: true })) findTicketDto: FindTicketDto) {
    try {
      return await this.ticketsService.findAll(findTicketDto);
    } catch (error) {
      console.error('Find tickets error:', error);
      throw new HttpException('Failed to fetch tickets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const ticket = await this.ticketsService.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTicketDto: UpdateTicketDto) {
    try {
      const ticket = await this.ticketsService.update(+id, updateTicketDto);
      return ticket;
    } catch (error) {
      throw new HttpException('Failed to update ticket', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }
}
