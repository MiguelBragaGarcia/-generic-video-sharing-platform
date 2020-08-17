import IParsedMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParsedMailTemplateDTO): Promise<string>;
}
