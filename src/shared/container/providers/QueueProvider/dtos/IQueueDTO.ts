import Bee from 'bee-queue';
import ISendEmailDTO from '../../MailProvider/dtos/ISendEmailDTO';

export default interface IQueueDTO {
  bee: Bee;
  handle(data: ISendEmailDTO): Promise<void>;
}
