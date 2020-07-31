import Bee from 'bee-queue';
import ISendEmailDTO from '../../MailProvider/dtos/ISendEmailDTO';

export default interface IQueueDTO {
  [key: string]: {
    bee: Bee;
    handle(data: ISendEmailDTO): Promise<void>;
  };
}
