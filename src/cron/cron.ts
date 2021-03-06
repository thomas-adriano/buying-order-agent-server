import { CronJob } from "cron";
import { Observable, Subject, Observer } from "rxjs";
import { AppConfigs } from "../app-configs";

export class Cron {
  private cronJob: CronJob;
  private cronObserver: Observer<void>;

  constructor(private configs: AppConfigs) {}

  public start(): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
      console.log(
        `cron: registering cron job ${this.configs.getAppCronPattern()}`
      );
      try {
        this.cronJob = new CronJob(
          this.configs.getAppCronPattern(),
          () => {
            console.log(
              `cron: running cron job ${this.configs.getAppCronPattern()}`
            );
            observer.next();
          },
          undefined,
          true,
          this.configs.getAppCronTimezone()
        );
        console.log(`cron: starting cron job`);
        this.cronJob.start();
      } catch (e) {
        console.error(
          "Ocorreu um erro tentando inicializar o Cron. Verifique o Cron Pattern informado. Mais informações em https://github.com/kelektiv/node-cron#cron-ranges"
        );
        observer.error(e);
      }
    });
  }

  public stop(): void {
    if (this.cronJob && this.cronJob.running) {
      console.log(`cron: stopping cron job`);
      this.cronJob.stop();
      if (this.cronObserver) {
        this.cronObserver.complete();
      }
    }
  }

  public isRunning(): boolean {
    return !!this.cronJob && !!this.cronJob.running;
  }
}
