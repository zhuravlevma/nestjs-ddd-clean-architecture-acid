import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToDeliverymanDto } from './dtos/add-order-to-deliveryman.dto';
import { UpdateDeliverymansInfoDto } from './dtos/update-deliverymans-info.dto';
import { ChangeDeliverymansStatusDto } from './dtos/change-deliverymans-status.dto';
import { CreateDeliverymanDto } from './dtos/create-deliveryman.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { AddOrderToDeliverymanUseCase } from './domain/ports/in/add-order-to-deliveryman.use-case';
import { ChangeDeliverymansStatusUseCase } from './domain/ports/in/change-deliverymans-status.use-case';
import { CreateDeliverymanUseCase } from './domain/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansQuery } from './domain/ports/in/find-all-deliverymans.use-case';
import { UpdateDeliverymansInfoUseCase } from './domain/ports/in/update-deliveryman-info.use-case';
import { UpdateOrderUseCase } from './domain/ports/in/update-order.use-case';
import { ApiTags } from '@nestjs/swagger';
import { DeliverymanEntity } from './domain/entities/deliveryman.entity';

@ApiTags('delivery')
@Controller('/delivery/deliverymans')
export class DeliverymanController {
  constructor(
    private readonly createDeliverymanUseCase: CreateDeliverymanUseCase,
    private readonly findAllDeliverymansUseCase: FindAllDeliverymansQuery,
    private readonly addOrderToDeliverymanUseCase: AddOrderToDeliverymanUseCase,
    private readonly updateDeliverymansInfoUseCase: UpdateDeliverymansInfoUseCase,
    private readonly changeDeliverymansStatusUseCase: ChangeDeliverymansStatusUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderUseCase,
  ) {}

  @Get('/')
  find(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansUseCase.execute();
  }

  @Post('/')
  createDeliveryMan(
    @Body() createDeliveryManDto: CreateDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanUseCase.execute(createDeliveryManDto);
  }

  @Post('/:deliverymanId/orders')
  addOrderToDeliveryman(
    @Param('deliverymanId') deliverymanId: string,
    @Body() addOrderToDeliverymanNestDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    return this.addOrderToDeliverymanUseCase.execute({
      deliverymanId,
      orderId: addOrderToDeliverymanNestDto.orderId,
    });
  }

  @Patch('/:deliverymanId')
  updateDeliverymansInfo(
    @Param('deliverymanId') deliverymanId: string,
    @Body() updateDeliverymansInfoNestDto: UpdateDeliverymansInfoDto,
  ): Promise<DeliverymanEntity> {
    return this.updateDeliverymansInfoUseCase.execute({
      deliverymanId,
      ...updateDeliverymansInfoNestDto,
    });
  }

  @Patch('/:deliverymanId/status')
  changeDeliverymansStatus(
    @Param('deliverymanId') deliverymanId: string,
    @Body() changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<DeliverymanEntity> {
    return this.changeDeliverymansStatusUseCase.execute({
      deliverymanId,
      ...changeDeliverymansStatusDto,
    });
  }

  @Patch('/:deliverymanId/orders/:orderId')
  updateDeliverymansOrderStatus(
    @Param('deliverymanId')
    deliverymanId: string,
    @Param('orderId')
    orderId: string,
    @Body() updateDeliverymansOrdersDto: UpdateOrderStatusDto,
  ): Promise<DeliverymanEntity> {
    return this.updateOrderStatusUseCase.execute({
      deliverymanId,
      orderId,
      ...updateDeliverymansOrdersDto,
    });
  }
}
