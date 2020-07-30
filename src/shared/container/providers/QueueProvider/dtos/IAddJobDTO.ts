import ISendEmailDTO from '../../MailProvider/dtos/ISendEmailDTO';

export default interface IAddJobDTO {
  queue: string;
  job: ISendEmailDTO;
}
