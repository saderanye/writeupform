import { Service } from "@adobe/data/service";
import { FormStateService } from "../state-service/state-service.js";

export interface MainService extends Service {
    serviceName: "main-service";
    state: FormStateService;
}
