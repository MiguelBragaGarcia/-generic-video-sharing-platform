import ISendEmailDTO from '../../MailProvider/dtos/ISendEmailDTO';

export default interface IJobsDTO {
  key: string;
  handle(data: ISendEmailDTO): Promise<void>;
}
