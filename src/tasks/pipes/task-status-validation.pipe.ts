import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    Object.values(TaskStatus)
  ]

  transform(value: any) {
    // tmp fix 500 err
    if (value === undefined) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}