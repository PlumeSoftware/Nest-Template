import { Controller } from '@nestjs/common';
import { LogService } from './log.service';
@Controller()
export class LogController {
    constructor(
        private readonly managerService: LogService,
    ) { }
}