import ISendEmailDTO from '../dtos/ISendEmailDTO';

export default interface IMailProvider {
  sendMail(data: ISendEmailDTO): Promise<void>;
}
