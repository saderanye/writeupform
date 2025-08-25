import { createFormStateService } from "../state-service/state-service.js";
import { MainService } from "./main-service.js";

export function createMainService(): MainService {
    return {
        state: createFormStateService(),
    } as unknown as MainService;
}
