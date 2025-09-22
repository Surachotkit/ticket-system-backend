import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

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
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
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
