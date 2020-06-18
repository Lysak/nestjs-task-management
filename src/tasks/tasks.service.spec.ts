import {Test} from '@nestjs/testing';
import {TasksService} from "./tasks.service";
import {TaskRepository} from "./tasks.repository";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatus} from "./task-status.enum";

const mockUser = { username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

describe('TaskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query'};
      // call tasksService.getTasks
      const result = await taskService.getTasks(filters, mockUser);
      // expect taskRepository.getTasks TO HAVE BEEN CALLED
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue')
    });
  });
});