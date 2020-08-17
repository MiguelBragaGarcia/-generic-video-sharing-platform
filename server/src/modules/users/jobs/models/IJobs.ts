export default interface IJobs {
  key: string;
  executeJob(data: any): Promise<void>;
}
