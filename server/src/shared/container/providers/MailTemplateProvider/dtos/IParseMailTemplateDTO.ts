interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParsedMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
